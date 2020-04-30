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

  const posStyles =
    positionStyles && positionStyles[pos] ? positionStyles[pos] : {};

  const {
    width: posWidth,
    height: posHeight,
    offsetX: posOffsetX,
    offsetY: posOffsetY,
  } = posStyles;

  const {
    width: globalWidth,
    height: globalHeight,
    offsetX: globalOffsetX,
    offsetY: globalOffsetY,
  } = styles || {};

  const customizedDimensions = useMemo<[number, number] | null>(() => {
    if (!dimensions) {
      return dimensions;
    }

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
  }, [dimensions, posWidth, globalWidth, posHeight, globalHeight]);

  const popperOptions =
    dimensions && customizedDimensions
      ? {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [
                  0 +
                    (posOffsetX
                      ? posOffsetX
                      : globalOffsetX
                      ? globalOffsetX
                      : 0),
                  -(
                    Math.abs(customizedDimensions[1] - dimensions[1]) / 2 +
                    dimensions[1]
                  ) +
                    -(posOffsetY
                      ? posOffsetY
                      : globalOffsetY
                      ? globalOffsetY
                      : 0),
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
    config: styles && styles.spring,
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
