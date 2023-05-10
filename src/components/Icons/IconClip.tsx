import React from 'react';
import Icon, { IconProps } from '../Icon';

const IconClip: React.FC<IconProps> = ({ ...props }) => {
  const fill = props.fill;
  return (
    <Icon {...props}>
      <path
        d="M16.5 6h1.5v11.484q0 2.297-1.594 3.914t-3.891 1.617-3.914-1.617-1.617-3.914v-12.469q0-1.641 1.195-2.836t2.836-1.195 2.813 1.195 1.172 2.836v10.5q0 1.031-0.727 1.758t-1.758 0.727-1.781-0.727-0.75-1.758v-9.516h1.5v9.516q0 0.422 0.305 0.703t0.727 0.281 0.703-0.281 0.281-0.703v-10.5q0-1.031-0.727-1.781t-1.758-0.75-1.781 0.75-0.75 1.781v12.469q0 1.641 1.195 2.836t2.836 1.195 2.813-1.195 1.172-2.836v-11.484z"
        fill={fill || 'black'}
      />
    </Icon>
  );
};

export default IconClip;
