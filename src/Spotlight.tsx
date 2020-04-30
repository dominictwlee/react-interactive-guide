import React, { forwardRef, useState, useEffect, Ref, useMemo } from 'react';
import { useSpring, animated as Animated } from 'react-spring';
import SpotlightLayer from './SpotlightLayer';
import usePopper from './usePopper';
import useAnimLifecycle from './useAnimLifecycle';
import { PositionStyles, GlobalStyles } from './types';

const AnimatedSpotlightLayer = Animated(SpotlightLayer);

export type SpotlightProps = {
  anchorEl: HTMLElement;
  show: boolean;
  curPos: number;
  pos: number;
  animated?: boolean;
  positionStyles?: PositionStyles['spotlight'];
  styles?: GlobalStyles['spotlight'];
};

const Spotlight = forwardRef<Ref<any>, SpotlightProps>((props, ref) => {
  const {
    anchorEl,
    show,
    curPos,
    pos,
    animated,
    positionStyles,
    styles,
  } = props;

  const [dimensions, setDimensions] = useState<[number, number] | null>(null);

  const customizedDimensions = useMemo<[number, number] | null>(() => {
    if (!dimensions) {
      return dimensions;
    }

    if (!positionStyles && !styles) {
      return dimensions;
    }

    const { width: posWidth, height: posHeight } = positionStyles?.[pos] ?? {};
    const { width: globalWidth, height: globalHeight } = styles ?? {};

    const [baseWidth, baseHeight] = dimensions;

    let width: number;
    let height: number;

    if (posWidth != null) {
      width = typeof posWidth === 'function' ? posWidth(baseWidth) : posWidth;
    } else if (globalWidth != null) {
      width =
        typeof globalWidth === 'function'
          ? globalWidth(baseWidth)
          : globalWidth;
    } else {
      width = baseWidth;
    }

    if (posHeight != null) {
      height =
        typeof posHeight === 'function' ? posHeight(baseHeight) : posHeight;
    } else if (globalHeight != null) {
      height =
        typeof globalHeight === 'function'
          ? globalHeight(baseHeight)
          : globalHeight;
    } else {
      height = baseHeight;
    }

    return [width, height];
  }, [dimensions, positionStyles, pos, styles]);

  const popperOptions =
    dimensions && customizedDimensions
      ? {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [
                  0,
                  -(
                    Math.abs(customizedDimensions[1] - dimensions[1]) / 2 +
                    dimensions[1]
                  ),
                ],
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
    config: styles?.spring,
  });

  if (
    !customizedDimensions ||
    (!show && (!animated || animLifecycle === 'idle'))
  ) {
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
        dimensions={customizedDimensions}
      />
    </div>
  );
});

export default Spotlight;
