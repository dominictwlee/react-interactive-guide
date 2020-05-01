import styled from 'styled-components';
import { animated } from 'react-spring';

type OverlayProps = {
  isIdle?: boolean;
  show?: boolean;
};

const Overlay = animated(
  styled.div<OverlayProps>(({ isIdle, show }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
    zIndex: 2300,
    visibility: isIdle && !show ? 'hidden' : 'visible',
    backgroundColor: 'rgba(26, 29, 52, 0.5)',
    mixBlendMode: 'hard-light',
  }))
);

export default Overlay;
