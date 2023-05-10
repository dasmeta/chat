import React, { ReactNode, useMemo } from 'react';
import { Avatar } from 'antd';
import Text from '../Text';
import { randomHex } from '../../utils/helper';
import { AvatarSizeType } from '../../types';
import findLastIndex from 'lodash/findLastIndex';
import min from 'lodash/min';
import './Avatar.less';

export type Avatar = {
  src?: string;
  name?: string;
  alt?: string;
  boldText?: boolean;
  className?: string;
  size?: AvatarSizeType;
  text?: string | ReactNode;
  description?: ReactNode;
  textLevel?: 1 | 2 | 3 | 4;
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
    | 'blue'
    | 'white'
    | 'light'
    | 'primary';
  avatarColor?:
    | 'dark-100'
    | 'dark-50'
    | 'dark-30'
    | 'dark-20'
    | 'dark-10'
    | 'indicator-good'
    | 'indicator-caution'
    | 'indicator-bad'
    | 'indicator-neutral';
  children?: React.ReactNode;
};

const sizeMapping: { [key in AvatarSizeType]: number } = {
  xxs: 16,
  xs: 24,
  x: 32,
  sm: 40,
  md: 44,
  lg: 48,
  lm: 52,
  l: 64,
  xl: 74,
  xxl: 94,
  xxxl: 116,
  xxxxl: 200,
  ssm: 80,
};
const nameFirstLetters = (name = '') => {
  const arr = name
    .split(' ')
    .map((s) => s.trim())
    .filter(Boolean);

  while (arr.length > 2) {
    const minVal = min(arr.map((s) => s.length));
    arr.splice(
      findLastIndex(arr, (s) => s.length === minVal),
      1,
    );
  }

  return arr.map((s) => s.charAt(0).toLocaleUpperCase()).join('');
};

const TAvatar: React.FC<Avatar> = ({
  size = 'md',
  avatarColor,
  textLevel = 2,
  children,
  boldText,
  description = '',
  textColor,
  ...props
}) => {
  const { src, name, text = '' } = props;
  const classNames = ['t-avatar', `t-avatar-wrapperBg-${avatarColor}`];
  const randomColorHex = useMemo(randomHex, []);

  return (
    <div className={`t-avatar-with-text-container`}>
      <div className={`t-avatar-container`}>
        <Avatar
          className={classNames.join(' ')}
          size={sizeMapping[size]}
          {...props}
          style={{ background: !src && randomColorHex }}
        >
          {(nameFirstLetters(name) || children)}
        </Avatar>
      </div>
      <div>
        {text && (
          <div className="t-avatar-text-wrapper">
            {typeof text === 'string' ? (
              <Text
                textColor={textColor}
                bold={boldText}
                rows={1}
                level={textLevel}
              >
                {text}
              </Text>
            ) : (
              text
            )}
          </div>
        )}
        {!!description && (
          <div className="t-avatar-text-wrapper">{description}</div>
        )}
      </div>
    </div>
  );
};

export default TAvatar;
