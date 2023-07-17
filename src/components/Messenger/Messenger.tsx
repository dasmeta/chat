import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import Message, { MessageActions } from './components/Message';
import MessengerInputArea, { MessengerActions } from '../MessengerInputArea';
import { Message as MessageType } from './components/MessageItem';
import Text from '../Text';
import ForwardMessage from './components/ForwardMessage';
import { Channel } from '../MessagesListItem';
import { Sender } from '../../types';
import './Messenger.module.less';
import './Messenger.less';

export type MessengerProps = {
  sender?: Sender;
  title?: string;
  channelId: string;
  chatHeight?: string;
  onSendMessage?: (message: MessageType, channelId?: string) => any;
  onReplyMessage: (message: object) => void;
  onForwardMessage?: (message: MessageType, channelId?: string) => any;
  onLoadAttachment?: (messageId: string) => any;
  handleRemoveMessage: (mesageId: string) => void;
  loading?: boolean;
  disabled?: boolean;
  messages?: MessageType[];
  actions: MessengerActions;
  replyEnabled?: boolean;
  emojiEnabled?: boolean;
  messageActions: MessageActions;
  onUpload: (item: any) => Promise<any>;
  onUploadSuccess?: (item: any) => void;
  onUploadError?: (error: any) => void;
  onScrollTop?: (messages: MessageType[]) => Promise<any>;
  disableOnScroll?: boolean;
  channels?: Channel[];
  filter: React.ReactNode;
};
const groupByDate = (messages) => {
  const dates = {};
  messages.forEach((item) => {
    const currentDate = moment(item.date).format('MMMM DD');
    if (!dates[currentDate]) {
      dates[currentDate] = [];
    }
    dates[currentDate].push(item);
  });

  return dates;
};

export const TMessenger: React.FC<MessengerProps> = ({
  sender,
  title,
  channelId,
  onSendMessage,
  onForwardMessage,
  onReplyMessage,
  chatHeight,
  disabled = false,
  messages = [],
  actions,
  replyEnabled = true,
  emojiEnabled = true,
  messageActions,
  handleRemoveMessage,
  onLoadAttachment,
  onUpload,
  onScrollTop,
  disableOnScroll = true,
  channels,
  filter,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);
  const [forwardedMessage, setForwardedMessage] = useState(null);
  const [repliedMessage, setRepliedMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupedMessages, setGroupedMessages] = useState<any>();

  const handleOnScrollTop = () => {
    if (typeof onScrollTop === 'function' && !loading) {
      setLoading(true);
      onScrollTop(messages).then(() => {
        setLoading(false);
      });
    }
  };

  const getScrollPosition = (e) => {
    if (disableOnScroll) {
      return;
    }
    const y =
      e.target.scrollHeight + e.target.scrollTop - e.target.clientHeight;
    if (y < 15) {
      handleOnScrollTop();
    }
  };
  useEffect(() => {
    setGroupedMessages(groupByDate(messages));
  }, [messages]);

  const renderMessages = () => {
    if (isEmpty(groupedMessages)) {
      return null;
    }

    return Object.keys(groupedMessages).map((item, index) => {
      const sortedMessages = groupedMessages[item].sort((a, b) => {
        return moment(a.date).isAfter(b.date) ? 1 : -1;
      });
      return (
        <div key={index}>
          <p className="chatApp__conv-messages-uniq-dates">{item}</p>
          {sortedMessages.map((mess) => {
            return (
              <Message
                onLoadAttachment={onLoadAttachment}
                getActiveMessage={(message) => setActiveMessage(message)}
                getForwardedMessage={(message) => setForwardedMessage(message)}
                getRepliedMessage={(message) => setRepliedMessage(message)}
                sender={sender}
                handleRemoveMessage={handleRemoveMessage}
                actions={messageActions}
                replyEnabled={replyEnabled}
                key={mess.id}
                message={mess}
                setModalVisible={setModalVisible}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="t-messenger-container">
      <ForwardMessage
        channels={channels}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onForwardMessage={onForwardMessage}
        forwardedMessage={forwardedMessage}
        filter={filter}
      />
      <Card
        title={
          title && (
            <div className="t-messenger-title">
              <Text level={1} bold rows={1}>
                {title}
              </Text>
            </div>
          )
        }
        cover={
          <div
            className="t-messenger-content-wrapper"
            style={{ height: chatHeight }}
          >
            <div
              onScroll={getScrollPosition}
              className={'chatApp__convTimeline t-messenger-messages'}
              style={{ height: chatHeight }}
            >
              {renderMessages()}
            </div>
          </div>
        }
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <MessengerInputArea
          activeMessage={activeMessage}
          unsetActiveMessage={() => setActiveMessage({})}
          repliedMessage={repliedMessage}
          unsetRepliedMessage={() => setRepliedMessage({})}
          actions={actions}
          emojiEnabled={emojiEnabled}
          onSendMessage={onSendMessage}
          onReplyMessage={onReplyMessage}
          channelId={channelId}
          onUpload={onUpload}
          disabled={disabled}
        />
      </Card>
    </div>
  );
};