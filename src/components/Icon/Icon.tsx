import React from 'react';
import './Icon.less';

export type IconProps = {
  /**
   * * xxs: w=10 h=10
   * * xs: w=13 h=13
   * * sm: w=20 h=20
   * * md: w=24 h=24
   * * lg: w=18 h=20
   * * xl: w=32 h=32
   */
  size?: 's' | 'sm' | 'md' | 'lg' | 'xxs' | 'xl' | 'xs';
  fill?: 'none' | string;
  stroke?: 'none' | string;
  /** @deprecated WARNING: this prop shall be removed from everywhere */
  className?: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement | SVGSVGElement>,
  ) => void;
  children?: React.ReactNode
};

const sizes = {
  xxs: { width: 10, height: 10 },
  xs: { width: 13, height: 13 },
  s: { width: 16, height: 16 },
  sm: { width: 20, height: 20 },
  xl: { width: 32, height: 32 },
  md: { width: 24, height: 24 },
  lg: { width: 18, height: 20 },
};

const Icon: React.FC<IconProps> = ({
  size = 'sm',
  onClick,
  fill = 'currentColor',
  stroke = 'none',
  children,
}) => {
  return (
    <svg
      {...sizes[size]}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      className="t-icon"
      onClick={onClick}
      stroke={stroke}
    >
      {children}
    </svg>
  );
};

export default Icon;
