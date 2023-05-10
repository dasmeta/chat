import React from 'react';
import MessagesGroupListItem from '../MessagesGroupListItem';
import defaultMessageImage from '../../images/message.png';
import isEmpty from 'lodash/isEmpty';
import './MessagesGroupList.less';
import Wrapper from '../Wrapper';

export type MessagesGroupListProps = {
  groupData?: any;
  height?: string;
  activeKey?: string;
};

const TMessagesGroupListItem: React.FC<MessagesGroupListProps> = ({
  groupData,
  height,
  activeKey,
}) => {
  return (
    <div className={'t-messages-group-list'} style={{ height: height }}>
      {!isEmpty(groupData) &&
        groupData.map((item, index) => {
          return (
            <Wrapper mb={1} key={index}>
              <MessagesGroupListItem
                avatar={defaultMessageImage}
                title={item.title}
                activeKey={activeKey}
              />
            </Wrapper>
          );
        })}
    </div>
  );
};

export default TMessagesGroupListItem;
