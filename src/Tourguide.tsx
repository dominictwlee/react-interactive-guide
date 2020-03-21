import React, {
  ReactElement,
  ComponentType,
  ReactNode,
  isValidElement,
  Fragment,
} from 'react';
import ReactDOM from 'react-dom';
import Spotlight from './Spotlight';
import Tooltip from './Tooltip';

export type TourguideProps = {
  animated?: boolean;
  tooltip?: JSX.Element[] | ReactElement | ComponentType;
  show: boolean;
  curPos: number;
  anchorEls: HTMLElement[];
  content?: ReactNode[];
  node: HTMLElement;
};

const Tourguide = (props: TourguideProps) => {
  const {
    tooltip: Component,
    animated,
    anchorEls,
    curPos,
    show,
    content,
    node,
  } = props;

  const anchorEl = anchorEls[curPos];

  if (!animated) {
    return ReactDOM.createPortal(
      <>
        <Spotlight
          anchorEl={anchorEl}
          show={show}
          pos={curPos}
          curPos={curPos}
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
      {anchorEls.map((el, index) => (
        <Fragment key={`tourguideEl-${index}`}>
          <Spotlight
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
    </>,
    node
  );
};
export default Tourguide;
