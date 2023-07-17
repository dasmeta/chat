import React, { ReactNode } from 'react';
import { Card } from 'antd';
import Loading from '../Loading';
import Text from '../Text';
import MessagesListItem, { MessagesListItemProps } from '../MessagesListItem';
import './MessagesCardList.less';

export type MessagesCardListProps = {
  title: string;
  seeAllLink?: ReactNode;
  height?: string;
  loading?: boolean;
  fallback?: ReactNode;
  messages: MessagesListItemProps[];
  noMessagesText?: string;
};

const TMessagesCardList: React.FC<MessagesCardListProps> = ({
  title,
  seeAllLink,
  messages = [],
  loading = false,
  height,
  fallback,
  noMessagesText,
}) => {
  return (
    <div className="t-cardList-container">
      {title && (
        <div className="t-card-title">
          <Text rows={1} level={1} bold>
            {title}
          </Text>
          {seeAllLink && (
            <Text level={3} textColor="dark-20">
              {seeAllLink}
            </Text>
          )}
        </div>
      )}
      <Card style={{ height: height || 'auto' }} bodyStyle={{ padding: '0px' }}>
        {loading ? (
          <Loading size="small" />
        ) : messages.length ? 
          messages.map((item, index) => (
            <MessagesListItem
              noMessagesText={noMessagesText}
              key={index}
              {...item}
            />
          )) : (
          <div className="t-card-fallback">{fallback}</div>
        )}
      </Card>
    </div>
  );
};

export default TMessagesCardList;
