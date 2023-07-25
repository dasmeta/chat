import React, { useState, useContext } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import MessageAttachmentLoader from './MessageAttachmentLoader';
import Avatar from '../../Avatar';
import { IconReply } from '../../Icons';
import { ConfigContext } from '../../../context/Config';
import { Sender } from '../../../types';

import './ConvMessage.less';

export type Message = {
  id?: string;
  messageId?: string;
  date: Date;
  type?: string;
  text?: string;
  edited?: boolean;
  fileName?: string;
  fileType?: string;
  sender?: Sender;
  seen?: Array<Sender>;
  repliedMessage?: Message;
};

export type MessageItemProps = {
  message: Message;
  getMessage: any;
  renderSeenNames: any;
  loaded: boolean;
  onLoadAttachment: (messageId: string) => any;
  onLoadSuccess?: () => any;
};

const TMessageItem: React.FC<MessageItemProps> = ({
  message,
  getMessage,
  renderSeenNames,
  loaded = true,
  onLoadAttachment,
  onLoadSuccess = () => {},
}) => {
  const { translate } = useContext(ConfigContext);
  const [seenNamesVisible, setSeenNamesVisible] = useState(false);

  return (
    <>
      <div className="t-conv-message-container-right">
        <div className="t-chatApp-conv-message-wrapper">
          <div className="chatApp__convMessageValue">
            <p className="chatApp__convMessageHeader">
              {!isEmpty(message.repliedMessage) && (
                <>
                  <IconReply fill="currentcolor" size="s" />
                  &nbsp;
                  <span className="chatApp__convMessageHeaderText">
                    {translate('You replied to {{to}}', { to: message.repliedMessage.sender.name })}
                  </span>
                </>
              )}
              {message.edited && <small>(edited)</small>}
            </p>
            {!isEmpty(message.repliedMessage) && (
              <div className="t-conv-replied-message">
                {message.repliedMessage.text}
              </div>
            )}
            <Tooltip
              placement="left"
              title={
                <span className="chatApp__convMessageDate">
                  {message.date
                    ? moment(message.date).format('MMM DD HH:mm')
                    : ''}
                </span>
              }
            >
              {loaded && getMessage()}
              {!loaded && (
                <MessageAttachmentLoader
                  message={message}
                  onLoad={onLoadAttachment}
                  onSuccess={onLoadSuccess}
                />
              )}
            </Tooltip>
            {seenNamesVisible && renderSeenNames()}
            <div
              className="t-chatApp-message-seen-avatars-wrapper"
              onClick={() => setSeenNamesVisible(!seenNamesVisible)}
            >
              {(message.seen || []).map((user, index) => (
                <div key={index}>
                  <Avatar
                    className="t-chatApp-message-seen-avatar"
                    src={user.avatar}
                    name={user.name}
                    size="xxs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TMessageItem;
