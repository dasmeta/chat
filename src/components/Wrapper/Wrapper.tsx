import React, { ReactNode } from 'react';
import './Wrapper.less';

type sizes = 1 | 2 | 3 | 4;
type display = 'block' | 'inline' | 'flex' | 'none';
type justifyContent = 'space-between' | 'center' | 'flex-end' | 'start' | 'end';
type alignItems = 'center' | 'end' | 'start' | 'baseline';
type flexDirecton = 'column'; // @TODO: fix misspelling
type opacities = 0 | 0.25 | 0.5 | 0.75 | 1;
type visibilities = 'visible' | 'hidden';

export type WrapperProps = {
  m?: sizes;
  mx?: sizes;
  my?: sizes;
  mt?: sizes;
  mr?: sizes;
  mb?: sizes;
  ml?: sizes;
  p?: sizes;
  px?: sizes;
  py?: sizes;
  pt?: sizes;
  pr?: sizes;
  pb?: sizes;
  pl?: sizes;
  children: ReactNode;
  isInline?: boolean;
  divider?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  display?: display;
  justifyContent?: justifyContent;
  alignItems?: alignItems;
  flexDirecton?: flexDirecton;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
  opacity?: opacities;
  visibility?: visibilities;
  style?: React.CSSProperties;
};

const Wrapper = React.forwardRef<HTMLDivElement, WrapperProps>(
  (
    {
      children,
      textAlign,
      isInline = false,
      divider = false,
      shadow = false,
      rounded = false,
      bordered = false,
      opacity = 1,
      style,
      ...props
    },
    ref,
  ) => {
    const classNames = Object.keys(props).map(
      (key) => `t-${key}-${props[key]}`,
    );

    if (shadow) {
      classNames.push('t-wrapper-with-shadow');
    }
    if (rounded) {
      classNames.push('t-wrapper-rounded');
    }
    if (bordered) {
      classNames.push('t-wrapper-bordered');
    }
    if (isInline) {
      classNames.push('t-wrapper-inline');
    }
    if (textAlign) {
      classNames.push(`t-al-${textAlign}`);
    }
    if (opacity !== 1) {
      classNames.push(`t-op-${opacity.toString().replace(/\D/, '')}`);
    }
    return (
      <div ref={ref} style={style} className={classNames.join(' ')}>
        {children}
      </div>
    );
  },
);

export default Wrapper;
