import React from 'react';
import { AnimatedValue } from 'react-spring';

type SpotlightLayerProps = {
  dimensions: [number, number];
  style?: AnimatedValue<any>;
};

const SpotlightLayer = ({ dimensions, style = {} }: SpotlightLayerProps) => {
  return (
    <div
      style={{
        ...style,
        borderRadius: 4,
        backgroundColor: 'gray',
        width: dimensions[0],
        height: dimensions[1],
      }}
    />
  );
};

export default SpotlightLayer;
