import React, { forwardRef, useState, useEffect, Ref } from 'react';
import { useSpring, animated as Animated } from 'react-spring';
import SpotlightLayer from './SpotlightLayer';
import usePopper from './usePopper';

const AnimatedSpotlightLayer = Animated(SpotlightLayer);

export type SpotlightProps = {
  anchorEl: HTMLElement;
  show: boolean;
  curPos: number;
  pos: number;
  animated?: boolean;
};

type SpotlightStatus = 'idle' | 'standby' | 'active';

const Spotlight = forwardRef<Ref<any>, SpotlightProps>((props, ref) => {
  const [dimensions, setDimensions] = useState<[number, number] | null>(null);
  const [spotlightStatus, setSpotlightStatus] = useState<SpotlightStatus>(
    'idle'
  );
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

  useEffect(() => {
    if (anchorEl) {
      const { width, height } = anchorEl.getBoundingClientRect();
      setDimensions([width, height]);
    }
  }, [anchorEl]);

  const handleAnimStart = () => {
    if (show && curPos === pos) {
      setSpotlightStatus('active');
    } else if (show) {
      setSpotlightStatus('standby');
    }
  };

  const handleAnimRest = () => {
    if (!show) {
      destroy();
      setSpotlightStatus('idle');
    } else if (curPos !== pos) {
      setSpotlightStatus('standby');
    }
  };

  const opacityAnim = useSpring({
    opacity: show && curPos === pos ? 1 : 0,
    onStart: handleAnimStart,
    onRest: handleAnimRest,
  });

  if (!dimensions || (!show && (!animated || spotlightStatus === 'idle'))) {
    return null;
  }

  return (
    <div
      ref={selfRef}
      style={{
        visibility: spotlightStatus === 'standby' ? 'hidden' : 'visible',
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
