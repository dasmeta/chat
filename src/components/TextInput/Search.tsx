import React, { ReactNode } from 'react';
import { Input, Button } from 'antd';
import './Search.less';
import { InputTypes } from '../../types';
import { SearchOutlined } from '@ant-design/icons';

export type SearchProps = {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  label?: ReactNode;
  rules?: Array<object>;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: InputTypes;
  onPressEnter?: React.KeyboardEventHandler;
  onSearch?: React.MouseEventHandler<HTMLDivElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const TSearch: React.FC<SearchProps> = ({ onSearch = () => {}, ...props }) => {
  return (
    <Input
      className="search-bar"
      {...props}
      prefix={
        <Button
          onClick={onSearch}
          block
          type="text"
          shape="circle"
          className="button"
          icon={<SearchOutlined className="icon" />}
        />
      }
    />
  );
};

export default TSearch;
