import React, { forwardRef, useState, useEffect, Ref } from 'react';
import { useSpring, animated as Animated } from 'react-spring';
import SpotlightShadow from './SpotlightShadow';
import usePopper from './usePopper';

const AnimatedShadow = Animated(SpotlightShadow);

export type MaskProps = {
  anchorEl: HTMLElement;
  show: boolean;
  curPos: number;
  pos: number;
  animated?: boolean;
  index?: number;
};

const Mask = forwardRef<Ref<any>, MaskProps>((props, ref) => {
  const [dimensions, setDimensions] = useState<[number, number] | null>(null);

  const { anchorEl, show, curPos, pos, animated, index } = props;

  useEffect(() => {
    if (anchorEl) {
      const { width, height } = anchorEl.getBoundingClientRect();
      setDimensions([width, height]);
    }
  }, [anchorEl]);

  const popperOptions = dimensions
    ? {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -(dimensions[1] + 7.5)],
            },
          },
        ],
      }
    : null;

  const { selfRef, handleAnimStart, handleAnimIdle, idle } = usePopper({
    anchorEl,
    show,
    popperOptions,
    ref,
    animated,
  });

  const opacityAnim = useSpring({
    opacity: show && curPos === pos ? 1 : 0,
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

  if (!dimensions || (!show && (!animated || idle))) {
    return null;
  }

  return (
    <div ref={selfRef} style={{ zIndex: index !== curPos ? -2000 : undefined }}>
      <AnimatedShadow
        style={animated ? opacityAnim : undefined}
        dimensions={dimensions}
      />
    </div>
  );
});

export default Mask;
