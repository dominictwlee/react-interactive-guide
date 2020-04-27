import { SpringConfig } from 'react-spring';

export type StyleConfig = {
  width?: (baseWidth: number) => void | number;
  height?: (baseHeight: number) => void | number;
  spring?: SpringConfig;
};

export type PositionStyles = {
  [position: number]: {
    spotlight?: StyleConfig;
  };
};
