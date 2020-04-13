import styled from 'styled-components';
import { animated } from 'react-spring';

type Align = 'center' | 'top' | 'bottom';
type Justify = 'left' | 'right' | 'center';

type ControlProps = {
  align: Align;
  justify: Justify;
  measuredWidth?: number;
};

type Position = {
  top?: string | number;
  bottom?: string | number;
  right?: string | number;
  left?: string | number;
};

function getPosition(
  justify: Justify,
  align: Align,
  measuredWidth?: number
): Position {
  const position: Position = {};

  if (align === 'center') {
    position.top = '50vh';
  } else if (align === 'top') {
    position.top = '2vw';
  } else if (align === 'bottom') {
    position.bottom = '7vh';
  }

  if (justify === 'left') {
    position.left = '2vw';
  } else if (justify === 'right') {
    position.right = '2vw';
  } else if (justify === 'center') {
    position.left = measuredWidth
      ? `calc(50vw - ${measuredWidth / 2}px)`
      : '50vw';
  }

  return position;
}

const Control = animated(
  styled.div<ControlProps>(({ justify, align, measuredWidth }) => ({
    position: 'absolute',
    zIndex: 2600,
    ...getPosition(justify, align, measuredWidth),
  }))
);

export default Control;
