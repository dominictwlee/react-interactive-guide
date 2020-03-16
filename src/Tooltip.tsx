import React, { forwardRef, ReactNode, Ref } from 'react';
import { useSpring, animated as Animated } from 'react-spring';
import styled from 'styled-components';
import usePopper from './usePopper';

const popperOptions = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 24],
      },
    },
  ],
};

const Card = styled(Animated.div)({
  boxShadow:
    '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  backgroundColor: 'white',
  borderRadius: '4px',
  padding: '1rem',
});

type TooltipProps = {
  anchorEl: Element;
  show: boolean;
  children?: ReactNode;
  curPos: number;
  pos: number;
  animated?: boolean;
};

export const Tooltip = forwardRef<Ref<any>, TooltipProps>((props, ref) => {
  const { anchorEl, show, children, curPos, pos, animated } = props;
  const { selfRef, handleAnimStart, handleAnimIdle, idle } = usePopper({
    anchorEl,
    show,
    popperOptions,
    ref,
    animated,
  });

  const scaleAnim = useSpring({
    to: {
      opacity: show && curPos === pos ? 1 : 0,
      transform: show && curPos === pos ? 'scaleY(1)' : 'scaleY(0)',
    },
    onStart: () => {
      if (show && handleAnimStart) {
        handleAnimStart();
      }
    },
    onRest: () => {
      if (!show && handleAnimIdle) {
        handleAnimIdle();
      }
    },
  });

  if (!show && (!animated || idle)) {
    return null;
  }

  return (
    <div ref={selfRef}>
      {children ? (
        <Animated.div style={animated ? scaleAnim : undefined}>
          {children}
        </Animated.div>
      ) : null}
    </div>
  );
});

export default Tooltip;
