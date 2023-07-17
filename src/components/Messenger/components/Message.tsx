import React, { useContext } from 'react';
import { Menu } from 'antd';
import isEmpty from 'lodash/isEmpty';
import MessageItem, { Message as MessageType } from './MessageItem';
import Dropdown from '../../Dropdown';
import {
  withLocalization,
  withLocalizationProps,
  ConfigContext,
} from '../../../context/Config';
import { IconMoreActions, IconReply } from "../../Icons";
import { Sender } from "../../../types";

export type MessageActions = {
  update: boolean;
  delete: boolean;
  forward: boolean;
};

export type MessageProps = {
  getActiveMessage: any;
  getForwardedMessage: any;
  getRepliedMessage: any;
  sender: Sender;
  message: MessageType;
  actions: MessageActions;
  replyEnabled?: boolean;
  emojiEnabled?: boolean;
  handleRemoveMessage: (messageId: string) => void;
  onLoadAttachment: (messageId: string) => any;
  setModalVisible?: (value: boolean) => void;
};

const TMessage: React.FC<MessageProps & withLocalizationProps> = ({
  sender,
  message,
  getActiveMessage,
  getForwardedMessage,
  getRepliedMessage,
  handleRemoveMessage,
  onLoadAttachment,
  actions,
  replyEnabled = true,
  setModalVisible,
}) => {
  const { translate } = useContext(ConfigContext);

  const isMe = message.sender.id === sender.id;

  const menu = (
    <Menu
      onClick={(e) => {
        switch (e.key) {
          case 'update':
            getActiveMessage(message);
            break;
          case 'delete':
            handleRemoveMessage(message.id);
            break;
          case 'forward':
            getForwardedMessage(message);
            setModalVisible(true);
            break;
        }
      }}
      className="t-dropdown-menu"
    >
      {actions?.update && (
        <Menu.Item key="update" disabled={!isMe || !message.id}>
          {translate('ui.message.update')}
        </Menu.Item>
      )}
      {actions?.delete && (
        <Menu.Item key="delete" disabled={!isMe || !message.id}>
          {translate('ui.message.remove')}
        </Menu.Item>
      )}
      {actions?.forward && (
        <Menu.Item key="forward">{translate('Forward')}</Menu.Item>
      )}
    </Menu>
  );

  return (
    <div
      className={
        !isMe
          ? 'chatApp__convMessageItemContainer'
          : 'chatApp__convMessageItemContainer-right'
      }
    >
      <MessageItem
        message={message}
        isMe={isMe}
        onLoadAttachment={onLoadAttachment}
      />
      {
        <div className="chatApp__message-actions">
          {replyEnabled && (
            <div
              className="chatApp__convMessageItem-action"
              onClick={() => getRepliedMessage(message)}
            >
              <IconReply size="s" />
            </div>
          )}
          {!isEmpty(actions) && (
            <Dropdown overlay={menu}>
              <div className="chatApp__convMessageItem-action">
                <IconMoreActions size="s" />
              </div>
            </Dropdown>
          )}
        </div>
      }
    </div>
  );
};

export default withLocalization(TMessage);
