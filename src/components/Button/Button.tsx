import React from 'react';
import { Button } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import './Button.less';

export type ButtonProps = AntButtonProps & {
  type?: 'primary' | 'link' | 'default' | 'text' | 'dashed' | 'ghost';
  size?: 'small' | 'middle' | 'large';
  htmlType?: 'submit' | 'reset' | 'button';
  fullWidth?: boolean;
  reset?: boolean;
};

const TButton: React.FC<ButtonProps> = ({
  size = 'middle',
  type = 'primary',
  htmlType = 'submit',
  fullWidth = false,
  reset = false,
  disabled = false,
  ...props
}) => {
  const newTypes = {
    reset: 'dashed',
    primary: 'primary',
    link: 'link',
    default: 'default',
    text: 'text',
    ghost: 'ghost',
  };

  const classNames = [
    't-button',
    `t-button-${newTypes[type]}`,
    `t-button-${size}`,
  ];
  if (fullWidth) {
    classNames.push('t-button-fullwidth');
  }
  if (reset) {
    classNames.push('t-button-reset');
  }
  if (disabled) {
    classNames.push('t-button-disabled');
  }

  return (
    <Button
      className={classNames.join(' ')}
      htmlType={htmlType}
      type={type}
      size={size}
      disabled={disabled}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default TButton;
