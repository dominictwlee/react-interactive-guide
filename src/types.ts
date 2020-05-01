import { SpringConfig } from 'react-spring';

export type StyleConfig = {
  width?: ((baseWidth: number) => number) | number;
  height?: ((baseHeight: number) => number) | number;
  offsetX?: number;
  offsetY?: number;
  spring?: SpringConfig;
};

export type GlobalStyles = {
  spotlight?: StyleConfig;
  tooltip?: StyleConfig;
};

export type PositionStyles = {
  spotlight?: {
    [position: number]: Omit<StyleConfig, 'spring'>;
  };
};
