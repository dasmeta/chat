import React, { memo } from 'react';
import { LoopCircleLoading } from 'react-loadingg';
import './Loading.less';

export type LoadingProps = {
  label?: string;
  fullscreen?: boolean;
  overlay?: boolean;
  size?: 'default' | 'small' | 'large';
  color?: string;
  speed?: number;
  spinning?: boolean;
  style?: React.CSSProperties;
};

const TLoading: React.FC<LoadingProps> = ({
  label,
  fullscreen = false,
  color,
  speed,
  overlay = false,
  size = 'default',
  spinning = true,
  style,
}) => {
  const classes = ['t-loading'];
  if (fullscreen) {
    classes.push('t-loading-fullscreen');
  }
  if (overlay) {
    classes.push('t-loading-overlay');
  }
  if (!color) {
    classes.push('t-loading-color-wrapper');
  }

  return spinning ? (
    <div className={classes.join(' ')}>
      <div className="t-loading-content">
        <LoopCircleLoading
          speed={speed}
          color={color}
          size={size}
          tip={label}
          style={style}
        />
      </div>
    </div>
  ) : null;
};

export default memo(TLoading, (prev, next) => prev.spinning === next.spinning);
