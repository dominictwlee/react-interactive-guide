import React from 'react';
import { AnimatedValue } from 'react-spring';

type SpotlightShadowProps = {
  dimensions: [number, number];
  style?: AnimatedValue<any>;
};

const SpotlightShadow = ({ dimensions, style = {} }: SpotlightShadowProps) => {
  return (
    <div
      style={{
        ...style,
        boxShadow:
          '0px 0px 5px 5px rgba(0,0,0,0.5) inset, 0px 0px 0px 3000px rgba(0,0,0,0.5)',
        width: dimensions[0] + 30,
        height: dimensions[1] + 30,
      }}
    />
  );
};

export default SpotlightShadow;
