import React, {
  ReactElement,
  ComponentType,
  ReactNode,
  isValidElement,
  Fragment,
  useCallback,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useSpring } from 'react-spring';
import throttle from 'lodash.throttle';

import Overlay from './Overlay';
import Spotlight from './Spotlight';
import Tooltip from './Tooltip';
import Control from './Control';
import useGuide from './useGuide';
import StepIndicator from './StepIndicator';
import { PositionStyles, GlobalStyles } from './types';

export type TourguideProps = {
  animated?: boolean;
  tooltip?: JSX.Element[] | ReactElement | ComponentType;
  content?: ReactNode[];
  node: HTMLElement;
  leftControl?: React.ReactElement;
  rightControl?: React.ReactElement;
  closeControl?: React.ReactElement;
  precondition?: boolean;
  positionStyles?: PositionStyles;
  styles?: GlobalStyles;
};

const TooltipContainer = styled.div({
  zIndex: 2400,
  position: 'absolute',
});

const Tourguide = (props: TourguideProps) => {
  const {
    tooltip: Component,
    animated = true,
    precondition = true,
    content,
    node,
    leftControl,
    rightControl,
    closeControl,
    positionStyles,
    styles,
  } = props;

  const [stepIndicatorWidth, setStepIndicatorWidth] = useState(0);
  const [isAnimIdle, setIsAnimIdle] = useState(true);

  const { anchorEls, curPos, show, close, setStatus, prev, next } = useGuide();

  const measuredStepIndicatorRef = useCallback((node) => {
    if (node !== null) {
      setStepIndicatorWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const anchorEl = anchorEls[curPos];

  const handleKeyDown = useCallback(
    throttle((event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          close();
          break;
        case 'ArrowLeft':
          prev();
          break;
        case 'ArrowRight':
          next();
          break;
        default:
          break;
      }
    }, 400),
    [close, next, prev]
  );

  const handleAnimStart = () => {
    if (show) {
      setIsAnimIdle(false);
    }
  };

  const handleAnimEnd = () => {
    if (!show) {
      setIsAnimIdle(true);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, show]);

  useEffect(() => {
    if (precondition && anchorEls.length) {
      setStatus('ready');
    }
  }, [anchorEls.length, precondition, setStatus]);

  const opacityAnim = useSpring({
    opacity: show ? 1 : 0,
    onStart: handleAnimStart,
    onRest: handleAnimEnd,
  });

  if (!animated) {
    return ReactDOM.createPortal(
      <>
        <Spotlight
          anchorEl={anchorEl}
          show={show}
          pos={curPos}
          curPos={curPos}
          positionStyles={positionStyles && positionStyles.spotlight}
          styles={styles && styles.spotlight}
        />
        {Component && (
          <Tooltip anchorEl={anchorEl} show={show} pos={curPos} curPos={curPos}>
            {Component}
          </Tooltip>
        )}
      </>,
      node
    );
  }

  return ReactDOM.createPortal(
    <>
      {leftControl && (
        <Control align="center" justify="left" style={opacityAnim}>
          {leftControl}
        </Control>
      )}
      {rightControl && (
        <Control align="center" justify="right" style={opacityAnim}>
          {rightControl}
        </Control>
      )}
      {closeControl && (
        <Control align="top" justify="right" style={opacityAnim}>
          {closeControl}
        </Control>
      )}
      <Control
        align="bottom"
        justify="center"
        ref={measuredStepIndicatorRef}
        measuredWidth={stepIndicatorWidth}
        style={opacityAnim}
      >
        <StepIndicator steps={anchorEls.length} curPos={curPos} />
      </Control>
      <Overlay style={opacityAnim} isIdle={isAnimIdle}>
        {anchorEls.map((el) => (
          <Spotlight
            key={`spotlight-${el.dataset.tourguidePosition}`}
            anchorEl={el}
            pos={Number(el.dataset.tourguidePosition)}
            animated
            show={show}
            curPos={curPos}
            positionStyles={positionStyles && positionStyles.spotlight}
            styles={styles && styles.spotlight}
          />
        ))}
      </Overlay>
      <TooltipContainer>
        {anchorEls.map((el, index) => (
          <Fragment key={`tourguideEl-${index}`}>
            {Component && (
              <Tooltip
                show={show}
                anchorEl={el}
                pos={Number(el.dataset.tourguidePosition)}
                curPos={curPos}
                animated
                index={index}
              >
                {Array.isArray(Component) ? (
                  Component[index]
                ) : isValidElement(Component) ? (
                  Component
                ) : (
                  <Component>{content && content[index]}</Component>
                )}
              </Tooltip>
            )}
          </Fragment>
        ))}
      </TooltipContainer>
    </>,
    node
  );
};
export default Tourguide;
