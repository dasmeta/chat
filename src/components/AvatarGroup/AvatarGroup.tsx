import React from 'react';
import Avatar from '../Avatar';
import './AvatarGroup.less';
import { AvatarSizeType } from '../../types';

export type AvatarGroup = {
  maxCount?: Number | string;
  maxStyle?: object;
  size?: AvatarSizeType;
  children?: React.ReactNode;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TAvatarGroup: React.FC<AvatarGroup> = ({ maxCount, children, size }) => {
  return (
    <div className="t-avatar-group">
      {/* //TODO After updating antd version in LMS, open comment
      <Avatar.Group maxCount={maxCount} maxStyle={maxStyle}>
        {children}
      </Avatar.Group> */}
        
        {children}
        <Avatar size={size}>{`+${maxCount}`}</Avatar>
    </div>
  );
};