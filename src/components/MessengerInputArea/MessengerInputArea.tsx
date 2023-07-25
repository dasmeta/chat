import React, { useContext, useState, useEffect, useRef } from 'react';
import { Input, Form, message, Button } from 'antd';
import { Picker } from 'emoji-mart';
import isEmpty from 'lodash/isEmpty';
import { ConfigContext } from '../../context/Config';
import IconSend from '../Icons/IconSend';
import VoiceRecorder from '../VoiceRecorder';
import Upload from '../Upload';
import IconClip from '../Icons/IconClip';
import Text from '../Text';
import { IconCloseOutlined, IconEmoji } from '../Icons';
import { useWindowSize } from '../../hooks/useWindowSize';
import { Message } from '../../types';
import 'emoji-mart/css/emoji-mart.css';
import '../TextInput/TextInput.less';
import './MessengerInputArea.less';

const { TextArea } = Input;

export type MessengerActions = {
  recorder: boolean;
  attachment: boolean;
};

export type InputProps = {
  activeMessage: Message;
  repliedMessage?: Message;
  unsetRepliedMessage: () => void;
  unsetActiveMessage: () => void;
  disabled?: boolean;
  actions?: MessengerActions;
  emojiEnabled?: boolean;
  onSendMessage?: (message: Message, channelId?: string) => any;
  onReplyMessage?: (message: Message, channelId?: string) => any;
  channelId: string;
  onUpload: (item: any) => Promise<any>;
  handleError?: (error: any) => void;
};

const detectMessageType = (type) => {
  const messageType = type.split('/').shift();
  if (!['image', 'video', 'audio'].includes(messageType)) {
    return 'attachment';
  }
  return messageType;
};

const detectLink = (value) => {
  const pattern = new RegExp(
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
  );
  const isLink = pattern.test(value);
  const type = isLink ? { type: 'link' } : {};
  return type;
};

const TInputArea: React.FC<InputProps> = ({
  repliedMessage,
  unsetRepliedMessage,
  activeMessage,
  unsetActiveMessage,
  disabled,
  actions,
  emojiEnabled = true,
  channelId,
  onUpload,
  onSendMessage,
  handleError = (err) => {
    message.error(err.message);
  },
}) => {
  const { translate } = useContext(ConfigContext);
  const [noMessage, setNoMessage] = useState(true);
  const [message, setMessage] = useState((activeMessage || {}).text);
  const [showEmoji, setShowEmoji] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const textAreaRef = useRef(null);
  const emojiRef = useRef(null);
  const emojiIconRef = useRef(null);
  const size = useWindowSize();
  const isMobile = size.width < 426;

  document.onkeydown = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    unsetActiveMessage();
  };

  const handleSendMessage = (message, channelId) => {
    const messageBody: Message = { ...message };
    const isActiveMessage = !isEmpty(activeMessage);
    if (isActiveMessage) {
      !messageBody.messageId && (messageBody.messageId = activeMessage.id);
      messageBody.date = activeMessage.date;
      messageBody.id = activeMessage.id;
    }
    if (!isEmpty(repliedMessage)) {
      messageBody.repliedMessage = {
        text: repliedMessage.text,
        sender: repliedMessage.sender,
        date: repliedMessage.date,
      };
      unsetRepliedMessage();
    }
    onSendMessage(messageBody, channelId);
    if (isActiveMessage) {
      unsetActiveMessage();
    }
    setMessage(null);
  };

  useEffect(() => {
    if (isEmpty(message)) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [message, noMessage]);

  useEffect(() => {
    if (!isEmpty(activeMessage)) {
      setMessage((activeMessage || {}).text);
    }
  }, [activeMessage]);

  useEffect(() => {
    if (repliedMessage) {
      textAreaRef.current.focus();
    }
  }, [repliedMessage]);

  function onPressEnter(e) {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();
      if (e.target.value.trim() !== '') {
        handleSendMessage(
          {
            text: e.target.value,
            date: new Date(),
            ...detectLink(e.target.value),
          },
          channelId,
        );
      }
    }
  }

  const handleSuccess = (file, response, action) => {
    handleSendMessage(
      {
        text: response.url || response.path,
        date: new Date(),
        fileType: action === 'recorder' ? 'audio/wav' : file.type,
        fileName: file.name,
        type: action === 'recorder' ? 'audio' : detectMessageType(file.type),
      },
      channelId,
    );
  };

  const onPaste = (file) => {
    if (!file) {
      return;
    }
    const uploadData = {
      file,
      folder: `channel-${channelId}`,
      type: file.type.split('/').pop(),
      filename: 'file',
    };

    onUpload(uploadData)
      .then((item) => {
        handleSuccess(file, item, 'attachment');
      })
      .catch((err) => handleError(err));
  };

  const handleEmojiSelect = (e) => {
    const emoji = e.native;
    setMessage((message) => (message || '') + `${emoji} `);
  };

  const handleClick = (event) => {
    const isEmojiIcon =
      emojiIconRef &&
      emojiIconRef.current &&
      emojiIconRef.current.contains(event.target);

    const isTarget =
      emojiRef && emojiRef.current && emojiRef.current.contains(event.target);
    if (isEmojiIcon) {
      setShowEmoji(!showEmoji);
      return;
    }

    if (!isTarget && showEmoji) {
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <div className="t-inputArea-container">
      {!isEmpty(repliedMessage) && (
        <div className="t-inputArea-reply-wrapper">
          <div className="t-inputArea-reply-by-user">
            <div>
              <Text level={3}>{translate('Reply to')}</Text>
              &nbsp;
              <Text level={3} semiBold>
                {repliedMessage.sender.name}
              </Text>
            </div>
            <IconCloseOutlined onClick={unsetRepliedMessage} />
          </div>
          <Text level={4}>{repliedMessage.text}</Text>
        </div>
      )}
      <Form
        className="inputArea"
        onFinish={(value: any) => {
          return handleSendMessage(
            {
              text: message,
              date: new Date(),
              ...detectLink(message),
            },
            channelId,
          );
        }}
      >
        <div className="t-inputArea-voiceUpload-wrapper">
          {actions?.recorder && (
            <VoiceRecorder
              folderName={`channel-${channelId}`}
              onUpload={onUpload}
              handleSuccess={(file, response) =>
                handleSuccess(file, response, 'recorder')
              }
              size="md"
              disabled={disabled}
            />
          )}
          {actions?.attachment && (
            <Upload
              folderName={`channel-${channelId}`}
              onUpload={onUpload}
              handleSuccess={(file, response) =>
                handleSuccess(file, response, 'attachment')
              }
              disabled={disabled}
            >
              <IconClip size="md" />
            </Upload>
          )}
        </div>
        <Form.Item name="message" className="formItem">
          <div
            className="t-input-area-wrapper"
            onPaste={(e) => onPaste(e.clipboardData.files[0])}
          >
            <div className="t-input-area">
              <TextArea
                ref={textAreaRef}
                value={message}
                className="inputPart"
                autoSize={{ minRows: 1, maxRows: 5 }}
                autoFocus
                placeholder={translate('ui.type.message', {}, false)}
                onChange={(item) => {
                  setMessage(item.target.value);
                  setNoMessage(item.target.value.trim() === '');
                  return;
                }}
                onPressEnter={onPressEnter}
                disabled={disabled}
              />
            </div>

            {emojiEnabled && (
              <div className="t-emojies-wrapper">
                <div ref={emojiRef} className="t-inputArea-emojies-wrapper">
                  {showEmoji && (
                    <Picker
                      onSelect={handleEmojiSelect}
                      emojiSize={20}
                      enableFrequentEmojiSort
                      title="Pick your emoji..."
                      notFoundEmoji="sleuth_or_spy"
                      emoji="point_up"
                      color="#ae65c5"
                      showPreview
                      showSkinTones
                    />
                  )}
                </div>
                <div className="t-inputArea-emoji-wrapper" ref={emojiIconRef}>
                  <IconEmoji />
                </div>
              </div>
            )}
            
            <Button
              htmlType='submit'
              className='t-send-button'
              size='large'
              type='primary'
              icon={
                <span className={isMobile && 'onMobile'}>
                  <IconSend />
                </span>
              }
              disabled={disabledButton}
            >
              {!isMobile && (
                <span className="sendTitle">
                  {translate(
                    isEmpty(activeMessage)
                      ? 'ui.message.send'
                      : 'ui.message.update',
                  )}
                </span>
              )}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TInputArea;
