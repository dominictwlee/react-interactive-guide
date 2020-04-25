import styled from 'styled-components';
import { animated } from 'react-spring';

type OverlayProps = {
  isIdle?: boolean;
};

const Overlay = animated(
  styled.div<OverlayProps>(({ isIdle }) => ({
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    visibility: isIdle ? 'hidden' : 'visible',
    zIndex: isIdle ? -1 : 2300,
    backgroundColor: 'rgba(26, 29, 52, 0.5)',
    mixBlendMode: 'hard-light',
  }))
);

export default Overlay;
