import React, { ReactNode } from 'react';
import Avatar from '../Avatar/Avatar';
import Text from '../Text/Text';
import './MessagesGroupListItem.less';

export type MessagesGroupListItemProps = {
  avatar: string;
  title?: string | ReactNode;
  activeKey?: string;
  // handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
};

const TMessagesGroupListItem: React.FC<MessagesGroupListItemProps> = ({
  avatar,
  activeKey,
  title,
}) => {
  const classNames = ['t-group-avatar-wrapper'];
  if (activeKey) {
    classNames.push('t-group-selected-avatar-wrapper');
  }

  return (
    <div className={'t-messages-group-list-item'}>
      <div className={classNames.join(' ')}>
        <Avatar src={avatar} size="l" />
      </div>
      <Text level={3} rows={2}>
        {title}
      </Text>
    </div>
  );
};

export default TMessagesGroupListItem;
