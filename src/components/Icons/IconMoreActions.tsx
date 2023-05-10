import React from 'react';
import Icon, { IconProps } from '../Icon';

const IconMoreActions: React.FC<IconProps> = ({ ...props }) => {
  const fill = props.fill || '#909091';
  return (
    <Icon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.11914 19.7264C9.11914 21.2629 10.4148 22.5586 11.9514 22.5586C13.5358 22.5586 14.7836 21.263 14.7836 19.7264C14.7836 18.142 13.488 16.8941 11.9514 16.8941C10.4148 16.8941 9.11914 18.1429 9.11914 19.7264Z"
          fill={fill}
        />
        <path
          d="M9.11914 4.26932C9.11914 5.85371 10.4148 7.10156 11.9514 7.10156C13.5358 7.10156 14.7836 5.80595 14.7836 4.26932C14.7836 2.73371 13.5358 1.43708 11.9514 1.43708C10.4148 1.43708 9.11914 2.7327 9.11914 4.26932Z"
          fill={fill}
        />
        <path
          d="M9.11914 11.8543C9.11914 13.4387 10.4148 14.6865 11.9514 14.6865C13.5358 14.6865 14.7836 13.3909 14.7836 11.8543C14.7836 10.2699 13.488 9.02209 11.9514 9.02209C10.4148 9.02303 9.11914 10.2708 9.11914 11.8543Z"
          fill={fill}
        />
      </svg>
    </Icon>
  );
};

export default IconMoreActions;
