import React, { ReactNode } from 'react';
import CardListESchool from '../CardListESchool';
import MessagesListItemESchool, {
  MessagesListItemProps,
} from '../MessagesListItemESchool';
import ComunicationIcon from './images/comunication.svg';

export type MessagesCardListProps = {
  title: string;
  headerIcon?: string;
  viewAll?: ReactNode;
  height?: string;
  loading?: boolean;
  fallback?: ReactNode;
  tabBarExtraContent?: ReactNode;
  messages: MessagesListItemProps[];
  noMessagesText?: string;
};

const TMessagesCardList: React.FC<MessagesCardListProps> = ({
  title,
  viewAll,
  messages = [],
  loading = false,
  height,
  fallback,
  noMessagesText,
  headerIcon,
}) => {
  return (
    <>
      <CardListESchool
        title={title}
        viewAll={viewAll}
        loading={loading}
        height={height}
        fallback={fallback}
        headerIcon={headerIcon || ComunicationIcon}
      >
        {messages.map((item, index) => (
          <MessagesListItemESchool
            noMessagesText={noMessagesText}
            key={index}
            {...item}
          />
        ))}
      </CardListESchool>
    </>
  );
};

export default TMessagesCardList;
