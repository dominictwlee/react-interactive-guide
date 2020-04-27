import styled from 'styled-components';
import { animated } from 'react-spring';

type OverlayProps = {
  isIdle?: boolean;
};

const Overlay = animated(
  styled.div<OverlayProps>(({ isIdle }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
    visibility: isIdle ? 'hidden' : 'visible',
    zIndex: isIdle ? -1 : 2300,
    backgroundColor: 'rgba(26, 29, 52, 0.5)',
    mixBlendMode: 'hard-light',
  }))
);

export default Overlay;
