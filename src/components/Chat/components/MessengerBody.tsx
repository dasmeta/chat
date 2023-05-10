import React, { useState, useEffect, useCallback } from 'react';
import keyBy from 'lodash/keyBy';
import isEmpty from 'lodash/isEmpty';
import { v4 } from 'uuid';
import { MessageActions } from '../../Messenger/components/Message';
import { MessengerActions } from '../../MessengerInputArea';
import { Message, Sender } from '../../Messenger/components/MessageItem';
import { Channel } from '../../MessagesListItem';
import Messenger from '../../Messenger';

export type MessengerBodyPropsType = {
  channel?: Channel;
  channels?: Channel[];
  chatHeight?: string;
  onSendMessage?: (message: Message, channel: Channel) => any;
  sender?: Sender;
  loading?: boolean;
  disabled?: boolean;
  getMessages?: (
    channelId?: string,
    messagesLoaded?: number,
  ) => Promise<Message[]>;
  newMessage?: Message & { channelId?: string };
  messageActions: MessageActions;
  actions: MessengerActions;
  onRemoveMessage: (messageId: string) => void;
  onUpload: (item: any) => Promise<any>;
  onUploadSuccess?: (item: any) => void;
  onUploadError?: (error: any) => void;
  onAttachmentLoad?: (messageId: string) => any;
  filter?: React.ReactNode;
};

const TMessengerBody: React.FC<MessengerBodyPropsType> = ({
  channel,
  onSendMessage,
  onRemoveMessage,
  chatHeight,
  getMessages,
  newMessage,
  actions,
  messageActions,
  onUpload,
  onAttachmentLoad,
  sender,
  channels,
  filter,
}) => {
  const [messages, setMessages] = useState([]);
  const [noMessage, setNoMessage] = useState(false);

  useEffect(() => {
    if (typeof getMessages === 'function') {
      getMessages(channel.id).then((messages) => {
        setMessages(messages);
      });
    }
  }, []);

  useEffect(() => {
    if (
      !newMessage ||
      newMessage.channelId !== channel.id ||
      messages.find((item) => item.id === newMessage.id)
    ) {
      return;
    }

    setMessages([newMessage, ...messages]);
  }, [newMessage]);

  const handleSendMessage = async (message) => {
    const data = {
      id: v4(),
      ...message,
      sender,
    };

    if (!message.id) {
      setMessages([data, ...messages]);
    } else {
      const messageMap = keyBy(messages, 'id');
      data.id = messageMap[message.messageId].id;
      messageMap[message.messageId] = { ...data, edited: true };
      setMessages(Object.values(messageMap));
    }
    onSendMessage(data, channel);
  };

  const handleReplyMessage = async (message) => {
    const data = {
      id: v4(),
      ...message,
      sender,
    };
    if (!message.messageId) {
      setMessages([data, ...messages]);
    } else {
      const messageMap = keyBy(messages, 'messageId');
      messageMap[message.messageId] = { ...data, edited: true };
      setMessages(Object.values(messageMap));
    }
    onSendMessage(data, channel);
  };

  const handleForwardMessage = async (message, forwardToChannel) => {
    message.forwardedMessage = message.sender;
    if (!isEmpty(message.repliedMessage)) {
      delete message.repliedMessage;
    }

    const data = {
      id: v4(),
      ...message,
      sender,
    };
    if (forwardToChannel.id === channel.id) {
      setMessages([data, ...messages]);
    }
    onSendMessage(data, forwardToChannel);
  };

  const handleRemoveMessage = async (id) => {
    const messageMap = keyBy(messages, 'id');
    delete messageMap[id];
    setMessages(Object.values(messageMap));
    onRemoveMessage(id);
  };

  const handleScrollTop = useCallback(async () => {
    if (!noMessage) {
      if (typeof getMessages === 'function') {
        getMessages(channel.id, messages.length).then((newMessages) => {
          setMessages([...messages, ...newMessages]);
          if (newMessages.length === 0) {
            setNoMessage(true);
          }
        });
      }
    }
  }, [messages]);

  return (
    <Messenger
      sender={sender}
      handleRemoveMessage={handleRemoveMessage}
      onReplyMessage={handleReplyMessage}
      messages={messages}
      channelId={channel.id}
      title={channel.title}
      disabled={channel.closed}
      actions={actions}
      messageActions={messageActions}
      onUpload={onUpload}
      onLoadAttachment={onAttachmentLoad}
      chatHeight={chatHeight}
      onSendMessage={handleSendMessage}
      onForwardMessage={handleForwardMessage}
      onScrollTop={handleScrollTop}
      disableOnScroll={noMessage}
      channels={channels}
      filter={filter}
    />
  );
};

export default TMessengerBody;
