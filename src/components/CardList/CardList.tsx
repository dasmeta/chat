import React, { ReactNode } from 'react';
import { Card } from 'antd';
import Loading from '../Loading';
import Text from '../Text';
import './CardList.less';

export type CardListProps = {
  title?: string;
  seeAllLink?: ReactNode;
  seeMoreLink?: ReactNode;
  height?: string | number;
  loading?: boolean;
  fallback?: ReactNode;
  children?: ReactNode;
  onItemClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onHover?: boolean;
};

const TCardList: React.FC<CardListProps> = ({
  title,
  seeAllLink,
  height,
  loading = false,
  fallback,
  children,
  seeMoreLink,
  onItemClick,
  onHover,
}) => {
  const classNames = ['t-cardList-container'];
  if (onHover) {
    classNames.push('cardHover');
  }

  return (
    <div className={classNames.join(' ')} onClick={onItemClick}>
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
        ) : children ? (
          children
        ) : (
          <div className="t-card-fallback">{fallback}</div>
        )}
      </Card>
      {seeMoreLink && <div className="t-card-table-footer">{seeMoreLink}</div>}
    </div>
  );
};

export default TCardList;
