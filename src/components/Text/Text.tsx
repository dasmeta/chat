import React, { useContext, useState } from 'react';
import { ConfigContext } from '../../context/Config';
import './Text.less';

export type Text = {
  level?: 1 | 2 | 3 | 4;
  bold?: boolean;
  semiBold?: boolean;
  paddingBottom?: 1 | 2 | 3 | 4;
  rows?: 1 | 2 | 3 | null;
  readMore?: boolean;
  innerText?: string;
  textColor?:
    | 'dark-100'
    | 'dark-50'
    | 'dark-30'
    | 'dark-20'
    | 'dark-10'
    | 'indicator-good'
    | 'indicator-caution'
    | 'indicator-bad'
    | 'indicator-neutral'
    | 'white'
    | 'light'
    | 'primary'
    | 'blue'
    | 'currentcolor'
    | 'trial'
    | 'black';

  title?: string;
  underline?: boolean;
  hover?: boolean;
  inline?: boolean;
  children?: React.ReactNode;
};

const TText: React.FC<Text> = ({
  children,
  level = 1,
  bold = false,
  semiBold = false,
  paddingBottom,
  rows,
  readMore = false,
  textColor = 'dark-100',
  inline,
  title,
  innerText,
  underline = false,
  hover = false,
}) => {
  const { translate } = useContext(ConfigContext);
  const [moreText, setMoreText] = useState(false);

  const names = {
    1: 'body',
    2: 'body2',
    3: 'paragraph',
    4: 'caption',
  };

  const classNames = ['t-text', `t-${names[level]}`];

  if (bold) classNames.push('t-bold');
  if (hover) classNames.push('t-text-hover');
  if (semiBold) classNames.push('t-semiBold');
  if (paddingBottom) classNames.push(`t-text-paddingBottom-${paddingBottom}`);
  if (textColor) classNames.push(`t-text-color-${textColor}`);
  if (moreText) classNames.push('t-readMore');
  if (rows && !moreText) classNames.push(`t-text-row t-text-row-${rows}`);
  if (underline) classNames.push('t-underline');
  if (inline) classNames.push('t-inline');

  function buttonText() {
    if (moreText) {
      return translate('iu.read.less');
    }
    return translate('ui.read.more');
  }

  return (
    <>
      {innerText ? (
        <p
          className={classNames.join(' ')}
          title={title}
          dangerouslySetInnerHTML={{ __html: innerText }}
        />
      ) : (
        <p className={classNames.join(' ')} title={title}>
          {children}
        </p>
      )}
      {readMore && (
        <span
          className={'t-read-more-wrapper'}
          style={{ padding: 0 }}
          onClick={() => setMoreText(!moreText)}
        >
          {buttonText()}
        </span>
      )}
    </>
  );
};

export default TText;
