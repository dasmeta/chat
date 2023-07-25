import React from 'react';
import Avatar from '../Avatar';
import Text from '../Text/Text';
import TimeViewer from '../TimeViewer/TimeViewer';
import AvatarGroup from '../AvatarGroup';
import MessageDefaultImage from '../../images/message.png';
import Avatarboye from '../../images/avatar1.png';
import AvatarGirl from '../../images/avatar2.png';
import './MessagesListItem.less';
import { ChannelType } from '../../constants';

export type Channel = {
  id: string;
  title: string;
  type: ChannelType;
  lastMessage?: {
    text: string;
    type?: string;
    author: string;
    date: string;
  };
  toUserId?: string;
  avatar?: string;
  avatarAlt?: string;
  closed?: boolean;
  sent?: boolean;
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
  onClick = (e:React.MouseEvent<HTMLDivElement>, item: Channel) => {},
  noMessagesText,
}) => {
  const groupDefaultImages = [AvatarGirl, Avatarboye];

  const renderAvatar = () => {
    if (channel.avatar !== '') {
      return (
        <Avatar src={channel.avatar} size="md">
          {channel.avatarAlt}
        </Avatar>
      );
    }
    if (!!channel.type && channel.type === 'group') {
      return (
        <AvatarGroup size="xs">
          {groupDefaultImages &&
            groupDefaultImages.map((item, index) => {
              return (
                <Avatar src={item} key={index} alt={`${index}`} size="xs" />
              );
            })}
        </AvatarGroup>
      );
    }
    return (
      <Avatar src={MessageDefaultImage} size="md">
        {channel.avatarAlt}
      </Avatar>
    );
  };

  const { author, type, text, date } = channel?.lastMessage || {};
  return (
    <div
      className={[
        't-messages-list-item',
        channel?.closed ? 't-messages-list-item-closed' : '',
      ].join(' ')}
      onClick={(e) => onClick(e, channel)}
    >
      <div
        style={{
          marginRight: 12,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'center',
        }}
      >
        {renderAvatar()}
      </div>
      <div className="t-content-wrapper">
        <div className="t-content-info">
          <Text rows={1} level={2} bold paddingBottom={3}>
            {channel.title}
          </Text>
          {text ? (
            <div style={{ minWidth: '100%' }}>
              <Text rows={1} level={3}>
                <span className="t-authorName">{author}: </span>
                {getMessageText(text, type)}
              </Text>
            </div>
          ) : (
            <Text textColor="dark-20" rows={1} level={3}>
              {noMessagesText}
            </Text>
          )}
        </div>

        <div className="t-content-date">
          <TimeViewer fromNow={true} start={date} />
        </div>
      </div>
    </div>
  );
};

export default TMessageListItem;
