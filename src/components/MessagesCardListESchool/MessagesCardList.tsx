import React, { ReactNode } from 'react';
import Text from '../Text';
import Wrapper from '../Wrapper';
import Loading from '../Loading';
import MessagesListItemESchool, {
  MessagesListItemProps,
} from '../MessagesListItemESchool';
import ComunicationIcon from './images/comunication.svg';

import './MessagesCardListESchool.less';

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
    <div className="e-cardList-container">
      <div className="e-card-list-header">
        <Text rows={1} level={1} bold>
          {title}
        </Text>
        <Wrapper ml={2}>
          <img style={{ width: '32px', height: '32px' }} src={headerIcon || ComunicationIcon} />
        </Wrapper>
      </div>
      <div
        className="e-card-list-fallback-wrapper"
        style={{ height: height || 'auto', overflow: 'auto' }}
      >
        {loading ? (
          <div className="e-card-loading-wrapper">
            <Loading />
          </div>
        ) : messages.length ? messages.map((item, index) => (
          <MessagesListItemESchool
            noMessagesText={noMessagesText}
            key={index}
            {...item}
          />
        )) : (
          <div className="e-card-fallback">{fallback}</div>
        )}
      </div>
      {viewAll && <div className={'e-card-list-footer'}>{viewAll}</div>}
    </div>
  );
};

export default TMessagesCardList;
