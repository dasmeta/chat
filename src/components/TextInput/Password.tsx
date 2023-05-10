import React, { ReactNode } from 'react';
import { Input, Form } from 'antd';
import { InputTypes } from '../../types';

import { NamePath } from 'antd/lib/form/interface';

export type PasswordProps = {
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
};

const Password: React.FC<PasswordProps> = ({
  size = 'middle',
  type = InputTypes.TEXT,
  disabled = false,
  label,
  value,
  name,
  rules = [],
  dependencies = [],
  ...props
}) => {
  const input = (
    <Input.Password
      size={size}
      className="t-text-input"
      value={value}
      type={type}
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

export default Password;
