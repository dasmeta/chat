import React, { useCallback, useState } from 'react';
import MessageItemRight from './MessageItemRight';
import MessageItemLeft from './MessageItemLeft';
import isEmpty from 'lodash/isEmpty';
import { Message } from '../../../types';
import './ConvMessage.less';

export type MessageItemProps = {
  message: Message;
  isMe?: boolean;
  isRepliedToMe?: boolean;
  onLoadAttachment: (messageId: string) => void;
};

const TMessageItem: React.FC<MessageItemProps> = ({
  message,
  isMe,
  isRepliedToMe,
  onLoadAttachment,
}) => {
  const [loaded, setLoaded] = useState<boolean>(message.loaded);

  const getMessage = useCallback(() => {
    switch (message.type) {
      case 'image': {
        return <img alt="img" src={message.text} />;
      }
      case 'audio': {
        return (
          <>
            <audio controls src={message.text}>
              ¯\_(ツ)_/¯
            </audio>
            {message.fileName && <div>{message.fileName}</div>}
          </>
        );
      }
      case 'video': {
        return (
          <video controls src={message.text}>
            ¯\_(ツ)_/¯
          </video>
        );
      }
      case 'attachment': {
        return <a href={message.text}>{message.fileName || message.text}</a>;
      }
      case 'link': {
        const urlify = (text) => {
          const urlRegex = /(https?:\/\/[^\s]+)/g;
          return text.replace(urlRegex, (url) => {
            return `<a href=${url}">${url}</a>`;
          });
        };
        const html = urlify(message.text);
        return (
          <div
            className={['t-conv-message-text', 't-conv-message-text-link'].join(
              ' ',
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      case 'html': {
        const classNames: String[] = ['t-conv-message-text'];
        if (!isEmpty(message.repliedMessage)) {
          classNames.push('t-conv-message-text-replied');
        }
        return (
          <div
            className={classNames.join(' ')}
            dangerouslySetInnerHTML={{ __html: message.text }}
          ></div>
        );
      }
      default: {
        const classNames: String[] = ['t-conv-message-text'];
        if (!isEmpty(message.repliedMessage)) {
          classNames.push('t-conv-message-text-replied');
        }
        return (
          <div className={classNames.join(' ')}>
            <pre>{message.text}</pre>
          </div>
        );
      }
    }
  }, [message]);

  const onLoadSuccess = () => {
    setLoaded(true);
  };

  const renderSeenNames = () => {
    return (
      <div className="t-chatApp-message-seen-names-wrapper">
        {message.seen.map((item, index) => (
          <span
            style={{ color: 'gray' }}
            className="t-chatApp-message-seen-name"
            key={index}
          >
            {item.name}
            {message.seen.length - 1 != index && ', '}
          </span>
        ))}
      </div>
    );
  };

  const renderMessages = () => {
    if (isMe) {
      return (
        <MessageItemRight
          message={message}
          getMessage={getMessage}
          renderSeenNames={renderSeenNames}
          loaded={loaded}
          onLoadAttachment={onLoadAttachment}
          onLoadSuccess={onLoadSuccess}
        />
      );
    }
    return (
      <MessageItemLeft
        message={message}
        getMessage={getMessage}
        renderSeenNames={renderSeenNames}
        loaded={loaded}
        onLoadAttachment={onLoadAttachment}
        onLoadSuccess={onLoadSuccess}
        isRepliedToMe={isRepliedToMe}
      />
    );
  };
  return <>{renderMessages()}</>;
};

export default TMessageItem;
