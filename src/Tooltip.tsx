import React, { forwardRef, ReactNode, Ref } from 'react';
import { useSpring, animated as Animated } from 'react-spring';
import usePopper from './usePopper';
import useAnimLifecycle from './useAnimLifecycle';
import { GlobalStyles } from 'types';

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
  index?: number;
  styles?: GlobalStyles['tooltip'];
};

export const Tooltip = forwardRef<Ref<any>, TooltipProps>((props, ref) => {
  const { anchorEl, show, children, curPos, pos, animated, styles } = props;

  const { selfRef, destroy } = usePopper({
    anchorEl,
    show,
    popperOptions,
    ref,
    animated,
  });

  const { handleAnimStart, handleAnimRest, animLifecycle } = useAnimLifecycle({
    show,
    curPos,
    pos,
    destroy,
  });

  const scaleAnim = useSpring({
    to: {
      opacity: show && curPos === pos ? 1 : 0,
      transform: show && curPos === pos ? 'scaleY(1)' : 'scaleY(0)',
    },
    onStart: handleAnimStart,
    onRest: handleAnimRest,
    config: styles && styles.spring,
  });

  if (!show && (!animated || animLifecycle === 'idle')) {
    return null;
  }

  return (
    <div
      ref={selfRef}
      style={{ visibility: animLifecycle === 'standby' ? 'hidden' : 'visible' }}
    >
      {children ? (
        <Animated.div style={animated ? scaleAnim : undefined}>
          {children}
        </Animated.div>
      ) : null}
    </div>
  );
});

export default Tooltip;
