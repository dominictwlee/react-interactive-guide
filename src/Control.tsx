import styled from 'styled-components';
import { animated } from 'react-spring';

type Align = 'center' | 'top';
type Justify = 'left' | 'right';

type ControlProps = {
  align: Align;
  justify: Justify;
};

function alignPos(align: Align) {
  switch (align) {
    case 'center':
      return '50vh';
    case 'top':
      return '2vw';
    default:
      return undefined;
  }
}

const Control = animated(
  styled.div<ControlProps>(({ align, justify }) => ({
    position: 'absolute',
    top: alignPos(align),
    left: justify === 'left' ? '2vw' : undefined,
    right: justify === 'right' ? '2vw' : undefined,
    zIndex: 2600,
  }))
);

export default Control;
