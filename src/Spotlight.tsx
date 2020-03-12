import React, { forwardRef, useMemo, useState, useEffect, Ref } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import usePopper from './usePopper';

const SpotlightShadow = styled.div<{ dimensions: [string, string] }>(({ dimensions }) => ({
  width: dimensions[0] + 30,
  height: dimensions[1] + 30,
  boxShadow: '0px 0px 5px 5px rgba(0,0,0,0.5) inset, 0px 0px 0px 3000px rgba(0,0,0,0.5)',
}));

const AnimatedShadow = animated(SpotlightShadow);

type SpotlightProps = {
  anchorEl: any;
  show: boolean;
  curPos: number;
  pos: number;
};

const Spotlight = forwardRef<Ref<any>, SpotlightProps>((props, ref) => {
  const [dimensions, setDimensions] = useState<[string, string] | null>(null);
  const { anchorEl, show, curPos, pos } = props;

  useEffect(() => {
    if (anchorEl) {
      const { width, height } = anchorEl.getBoundingClientRect();
      setDimensions([width, height]);
    }
  }, [anchorEl]);

  const popperOptions = useMemo(() => {
    if (!dimensions) {
      return null;
    }

    return {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, -(dimensions[1] + 15)],
          },
        },
      ],
    };
  }, [dimensions]);

  const { selfRef, handleAnimStart, handleAnimIdle, idle } = usePopper({
    anchorEl,
    show,
    popperOptions,
    ref,
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

  if (!dimensions || (!show && idle)) {
    return null;
  }

  return (
    <div ref={selfRef}>
      <AnimatedShadow style={opacityAnim} dimensions={dimensions} />
    </div>
  );
});

export default Spotlight;
