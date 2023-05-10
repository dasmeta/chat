import React, { ReactNode } from 'react';
import { Input, Form } from 'antd';
import { InputTypes } from '../../types';
import './TextInput.less';

import type { NamePath } from 'antd/lib/form/interface';

export type TextInputProps = {
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  label?: ReactNode;
  name?: NamePath;
  rules?: Array<object>;
  type?: InputTypes;
  dependencies?: NamePath[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
};

const TTextInput: React.FC<TextInputProps> = ({
  size = 'middle',
  type = InputTypes.TEXT,
  disabled = false,
  label,
  value,
  name,
  rules = [],
  dependencies = [],
  autoFocus = false,
  ...props
}) => {
  const input = (
    <Input
      size={size}
      className="t-text-input"
      value={value}
      type={type}
      autoFocus={autoFocus}
      {...props}
    />
  );
  return name ? (
    <Form.Item
      dependencies={dependencies}
      label={label}
      name={name}
      initialValue={value}
      rules={rules}
    >
      {input}
    </Form.Item>
  ) : (
    input
  );
};

export default TTextInput;
