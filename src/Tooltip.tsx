import React, { forwardRef, ReactNode, Ref } from 'react';
import { useSpring, animated as Animated } from 'react-spring';
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
