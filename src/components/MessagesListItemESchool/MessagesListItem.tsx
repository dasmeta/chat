import React from 'react';
import Avatar from '../Avatar';
import Text from '../Text/Text';
import TimeViewerESchool from '../TimeViewerESchool';
import AvatarGroup from '../AvatarGroup';
import MessageDefaultImage from '../../images/message.png';
import Avatarboye from '../../images/avatar1.png';
import AvatarGirl from '../../images/avatar2.png';
import './MessagesListItem.less';

// TODO: complete these types and use in project
type Group = {
  id: string;
  studentsCount: Number;
};

type Partner = {
  id: string;
};

export type Channel = {
  id: string;
  title: string;
  type: 'group' | 'direct' | 'system';
  lastMessage: {
    text: string;
    type?: string;
    author: string;
    date: string;
  };
  toUserId?: string;
  avatar: string;
  avatarAlt: string;
  closed?: boolean;
};

export type MessagesListItemProps = {
  channel: Channel;
  noMessagesText?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>, item: Channel) => void;
};

const getMessageText = (text: string, type: string): string => {
  if (!type) {
    return text;
  }
  if (['audio', 'video', 'image'].includes(type)) {
    return `[${type}]`;
  }
  return '[attachment]';
};

const TMessageListItem: React.FC<MessagesListItemProps> = ({
  channel,
  onClick = () => {},
  noMessagesText,
}) => {
  const groupDefaultImages = [AvatarGirl, Avatarboye];

  return (
    <div
      className={[
        'e-messages-list-item',
        channel.closed ? 'e-messages-list-item-closed' : '',
      ].join(' ')}
      onClick={(e) => onClick(e, channel)}
    >
      <div className="e-avatar-container">
        {!!channel.type && channel.type !== 'group' ? (
          <div className="e-avatar-wrapper">
            <Avatar
              src={channel.avatar !== '' ? channel.avatar : MessageDefaultImage}
              size="md"
            >
              {channel.avatarAlt}
            </Avatar>
          </div>
        ) : (
          <div className="e-avatar-group-wrapper">
            <AvatarGroup
              size="xs"
              // maxCount={studentsCount ? studentsCount : ''}
            >
              {groupDefaultImages &&
                groupDefaultImages.map((item, index) => {
                  return (
                    <Avatar src={item} key={index} alt={`${index}`} size="xs" />
                  );
                })}
            </AvatarGroup>
          </div>
        )}
      </div>
      <div className="e-content-wrapper">
        <div className="e-content-info">
          <Text rows={1} level={3} textColor="dark-30">
            {channel.lastMessage.author}
          </Text>
          <Text rows={1} level={2} bold>
            {channel.title}
          </Text>
          {channel.lastMessage.text ? (
            <Text rows={1} level={3}>
              {getMessageText(
                channel.lastMessage.text,
                channel.lastMessage.type,
              )}
            </Text>
          ) : (
            <Text textColor="dark-20" rows={1} level={3}>
              {noMessagesText}
            </Text>
          )}
        </div>
        <div className="e-content-date">
          <TimeViewerESchool fromNow={true} start={channel.lastMessage.date} />
        </div>
      </div>
    </div>
  );
};

export default TMessageListItem;
