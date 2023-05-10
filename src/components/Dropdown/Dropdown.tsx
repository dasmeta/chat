import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import './Dropdown.less';

const TDropdown: React.FC<DropDownProps> = ({
  children,
  overlay,
  ...props
}) => {
  return (
    <Dropdown
      {...props}
      overlay={overlay}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
    >
      {children}
    </Dropdown>
  );
};

export default TDropdown;
