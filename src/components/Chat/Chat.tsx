import React, { ReactNode, useState } from 'react';
import { Tabs } from 'antd';
import MessagesListItem, { Channel } from '../MessagesListItem';
import { useWindowSize } from '../../hooks/useWindowSize';
import Conversation, {
  ConversationPropsType,
} from '../Conversation';
import './Chat.less';

export type ChannelListProps = {
  channels?: Channel[];
  height?: string | number;
  isFetching?: Boolean;
  header?: ReactNode;
  onChangePage?: (condition?: any) => void;
  onChannelChange?: (condition?: any) => void;
  activeChannel?: string;
  onItemClick?: (
    key: string,
    event: React.MouseEvent<HTMLInputElement>,
  ) => void;
  messenger: ConversationPropsType;
  onScrollBottom?: (channels: Channel[]) => Promise<any>;
  disableOnScroll?: boolean;
};

const TabPane = Tabs.TabPane;

export const TChannelList: React.FC<ChannelListProps> = ({
  channels = [],
  height,
  onChannelChange,
  activeChannel,
  onItemClick,
  header,
  messenger,
  onScrollBottom,
  disableOnScroll = false,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOnScrollTop = () => {
    if (typeof onScrollBottom === 'function' && !loading) {
      setLoading(true);
      onScrollBottom(channels).then(() => {
        setLoading(false);
      });
    }
  };

  const getScrollPosition = (e) => {
    if (disableOnScroll) {
      return;
    }
    const y =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
    if (y === 0) {
      handleOnScrollTop();
    }
  };

  const size = useWindowSize();
  const mobile = size.width < 769;

  // useEffect(() => {
  //   if (isIntersecting && !isFetching && onChangePage) {
  //     onChangePage();
  //   }
  // }, [isIntersecting]);

  return (
    <div className="t-chat-container">
      {/* //TODO there are noe functionality yet
    <Wrapper mr={2}>
      <MessagesGroupList height={height} groupData={channelList} />
    </Wrapper> */}
      <Tabs
        className="t-chat"
        tabPosition="left"
        tabBarGutter={0}
        activeKey={activeChannel}
        onChange={onChannelChange}
        onTabClick={onItemClick}
        tabBarExtraContent={header}
        tabBarStyle={{
          marginBottom: mobile ? '50px' : 'auto',
          height: mobile ? 'calc(100vh - 350px)' : height,
          width: mobile ? '100%' : '25%',
        }}
        onScroll={getScrollPosition}
      >
        {channels.map((item) => (
          <TabPane
            tab={<MessagesListItem channel={item} />}
            key={item.id}
            style={{ paddingLeft: !mobile ? '16px' : '0px' }}
          >
            <Conversation
              {...messenger}
              channel={item}
              channels={channels}
              filter={header}
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};