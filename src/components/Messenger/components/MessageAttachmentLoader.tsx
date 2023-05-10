import React, { useState } from 'react';
import { Spin } from 'antd';
import './ConvMessage.less';
import { IconRefresh } from "../../Icons";
import { Message } from './MessageItem';

export type Sender = {
  id?: string;
  name: string;
  avatar?: string;
};

export type MessageAttachmentLoaderProps = {
  message: Message;
  onLoad?: (messageId: string) => any;
  onSuccess?: () => void;
};

const TMessageAttachmentLoader: React.FC<MessageAttachmentLoaderProps> = ({
  message,
  onLoad = async (messageId: string) => {},
  onSuccess = () => {},
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoad = () => {
    setLoading(true);
    onLoad(message.id).then((data: any) => {
      if (data.success) {
        onSuccess();
      }
      setLoading(false);
    });
  };

  return (
    <div>
      {loading ? (
        <Spin size="default" spinning />
      ) : (
        <span className="t-load-attachment">
          <IconRefresh onClick={handleLoad} fill="currentcolor" size="md" />
        </span>
      )}
      <span className="t-load-attachment-text">{`[${message?.type}]`}</span>
    </div>
  );
};

export default TMessageAttachmentLoader;
