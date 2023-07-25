import React, { useContext } from 'react';
import { Button, Divider, Modal } from 'antd';
import Avatar from '../../Avatar';
import { Channel } from '../../MessagesListItem';
import Text from '../../Text';
import MessageDefaultImage from '../../../images/message.png';
import { ConfigContext } from '../../../context/Config';
import { Message  } from '../../../types';
import remove from 'lodash/remove';

export type ForwardMessagePropsType = {
  channels?: Channel[];
  modalVisible?: boolean;
  setModalVisible?: (item: boolean) => void;
  onForwardMessage?: (message: Message, channelId?: string) => any;
  forwardedMessage: Message;
  filter: React.ReactNode;
};

const sent = [];

const TForwardMessage: React.FC<ForwardMessagePropsType> = ({
  channels,
  modalVisible,
  setModalVisible,
  onForwardMessage,
  forwardedMessage,
  filter,
}) => {
  const { translate } = useContext(ConfigContext);
  const handleSendMessage = (channel) => {
    const messageBody: Message = { ...forwardedMessage };
    delete messageBody.id;
    delete messageBody.messageId;
    messageBody.date = new Date();
    onForwardMessage(messageBody, channel);
    sent.push(channel.id);
  };

  return (
    <Modal
      title={
        <Text textColor="black" level={1} rows={1} semiBold>
          {translate('Forward')}
        </Text>
      }
      visible={modalVisible}
      className="t-chat-forward-container"
      bodyStyle={{ maxHeight: '70vh', overflow: 'scroll' }}
      footer={null}
      centered
      onCancel={() => setModalVisible(false)}
      afterClose={() => remove(sent)}
    >
      <div className="t-chat-forward-wrapper">
        <div className="t-chat-search-input-wrapper">{filter}</div>
        <Divider />
        <div className="t-chat-forward-channelItems">
          {channels?.map((channel) => {
            const classnames = [
              't-chat-forward-send-button',
              sent.includes(channel.id) &&
                't-chat-forward-send-button-disabled',
            ];

            return (
              <div key={channel.id} className="t-chat-forward-channelItem">
                <Avatar
                  src={
                    channel.avatar !== '' ? channel.avatar : MessageDefaultImage
                  }
                  size="sm"
                >
                  {channel.avatarAlt}
                </Avatar>
                <div className="t-chat-forward-channelItem-body">
                  <Text textColor="black" level={4} rows={1}>
                    {channel.title}
                  </Text>
                  <Button
                    className={classnames.filter(Boolean).join(' ')}
                    size="middle"
                    shape="round"
                    onClick={() => handleSendMessage(channel)}
                    disabled={sent.includes(channel.id)}
                  >
                    {!sent.includes(channel.id)
                      ? translate('Send')
                      : translate('Sent')}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default TForwardMessage;
