import React, { ReactNode } from 'react';
import Loading from '../Loading';
import Text from '../Text';
import Wrapper from '../Wrapper';
import './CardList.less';

export type CardListProps = {
  title?: string;
  seeAllLink?: ReactNode;
  viewAll?: ReactNode;
  height?: string | number;
  loading?: boolean;
  fallback?: ReactNode;
  children?: ReactNode;
  headerIcon?: string;
  onItemClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
};

const TCardList: React.FC<CardListProps> = ({
  title,
  height,
  loading = false,
  fallback,
  children,
  viewAll,
  onItemClick,
  headerIcon,
}) => {
  return (
    <div className="e-cardList-container" onClick={onItemClick}>
      <div className="e-card-list-header">
        <Text rows={1} level={1} bold>
          {title}
        </Text>
        <Wrapper ml={2}>
          <img style={{ width: '32px', height: '32px' }} src={headerIcon} />
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
        ) : children ? (
          children
        ) : (
          <div className="e-card-fallback">{fallback}</div>
        )}
      </div>
      {viewAll && <div className={'e-card-list-footer'}>{viewAll}</div>}
    </div>
  );
};

export default TCardList;
