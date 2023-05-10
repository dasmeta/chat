import React, { ReactNode } from 'react';
import CardList from '../CardList';
import MessagesListItem, { MessagesListItemProps } from '../MessagesListItem';

export type MessagesCardListProps = {
  title: string;
  seeAllLink?: ReactNode;
  height?: string;
  loading?: boolean;
  fallback?: ReactNode;
  tabBarExtraContent?: ReactNode;
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
    <>
      <CardList
        title={title}
        seeAllLink={seeAllLink}
        loading={loading}
        height={height}
        fallback={fallback}
      >
        {messages.map((item, index) => (
          <MessagesListItem
            noMessagesText={noMessagesText}
            key={index}
            {...item}
          />
        ))}
      </CardList>
    </>
  );
};

export default TMessagesCardList;
