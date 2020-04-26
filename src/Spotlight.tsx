import React, { forwardRef, useState, useEffect, Ref } from 'react';
import { useSpring, animated as Animated } from 'react-spring';
import SpotlightLayer from './SpotlightLayer';
import usePopper from './usePopper';
import useAnimLifecycle from './useAnimLifecycle';

const AnimatedSpotlightLayer = Animated(SpotlightLayer);

export type SpotlightProps = {
  anchorEl: HTMLElement;
  show: boolean;
  curPos: number;
  pos: number;
  animated?: boolean;
};

const Spotlight = forwardRef<Ref<any>, SpotlightProps>((props, ref) => {
  const [dimensions, setDimensions] = useState<[number, number] | null>(null);
  const { anchorEl, show, curPos, pos, animated } = props;
  const popperOptions = dimensions
    ? {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -dimensions[1]],
            },
          },
        ],
      }
    : null;

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

  useEffect(() => {
    if (anchorEl) {
      const { width, height } = anchorEl.getBoundingClientRect();
      setDimensions([width, height]);
    }
  }, [anchorEl]);

  const opacityAnim = useSpring({
    opacity: show && curPos === pos ? 1 : 0,
    onStart: handleAnimStart,
    onRest: handleAnimRest,
  });

  if (!dimensions || (!show && (!animated || animLifecycle === 'idle'))) {
    return null;
  }

  return (
    <div
      ref={selfRef}
      style={{
        visibility: animLifecycle === 'standby' ? 'hidden' : 'visible',
      }}
    >
      <AnimatedSpotlightLayer
        style={animated ? opacityAnim : undefined}
        dimensions={dimensions}
      />
    </div>
  );
});

export default Spotlight;
