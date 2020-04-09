import React, {
  ReactElement,
  ComponentType,
  ReactNode,
  isValidElement,
  Fragment,
} from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useSpring } from 'react-spring';

import Mask from './Mask';
import Tooltip from './Tooltip';
import Control from './Control';
import useGuide from './useGuide';

export type TourguideProps = {
  animated?: boolean;
  tooltip?: JSX.Element[] | ReactElement | ComponentType;
  content?: ReactNode[];
  node: HTMLElement;
  leftControl?: React.ReactElement;
  rightControl?: React.ReactElement;
  closeControl?: React.ReactElement;
};

const GuideContainer = styled.div({
  zIndex: 2400,
  position: 'absolute',
});

const Tourguide = (props: TourguideProps) => {
  const {
    tooltip: Component,
    animated = true,
    content,
    node,
    leftControl,
    rightControl,
    closeControl,
  } = props;

  const { anchorEls, curPos, show } = useGuide();

  const anchorEl = anchorEls[curPos];

  const opacityAnim = useSpring({
    opacity: show ? 1 : 0,
  });

  if (!animated) {
    return ReactDOM.createPortal(
      <>
        <Mask anchorEl={anchorEl} show={show} pos={curPos} curPos={curPos} />
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
      <GuideContainer>
        {anchorEls.map((el, index) => (
          <Fragment key={`tourguideEl-${index}`}>
            <Mask
              anchorEl={el}
              pos={Number(el.dataset.tourguidePosition)}
              animated
              show={show}
              curPos={curPos}
            />
            {Component && (
              <Tooltip
                show={show}
                anchorEl={el}
                pos={Number(el.dataset.tourguidePosition)}
                curPos={curPos}
                animated
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
      </GuideContainer>
    </>,
    node
  );
};
export default Tourguide;
