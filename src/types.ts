import { SpringConfig } from 'react-spring';

export type StyleConfig = {
  width?: ((baseWidth: number) => number) | number;
  height?: ((baseHeight: number) => number) | number;
  spring?: SpringConfig;
};

export type SpotlightStylesGlobal = Omit<StyleConfig, 'width' | 'height'>;

export type GlobalStyles = {
  spotlight?: SpotlightStylesGlobal;
};

export type PositionStyles = {
  spotlight?: {
    [position: number]: Omit<StyleConfig, 'spring'>;
  };
};
