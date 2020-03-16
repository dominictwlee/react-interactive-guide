import React, {
  ReactElement,
  ComponentType,
  ReactNode,
  isValidElement,
} from 'react';
import Spotlight from './Spotlight';
import Tooltip from './Tooltip';

export type TourguideProps = {
  animated?: boolean;
  tooltip?: JSX.Element[] | ReactElement | ComponentType;
  show: boolean;
  curPos: number;
  anchorEls: HTMLElement[];
  content?: ReactNode[];
};

const Tourguide = (props: TourguideProps) => {
  const {
    tooltip: Component,
    animated,
    anchorEls,
    curPos,
    show,
    content,
  } = props;

  const anchorEl = anchorEls[curPos];

  if (!animated) {
    return (
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
      </>
    );
  }

  return (
    <>
      {anchorEls.map((el, index) => (
        <>
          <Spotlight
            key={`anchorEl-spotlight-${index}`}
            anchorEl={el}
            pos={Number(el.dataset.tourguidePosition)}
            animated
            show={show}
            curPos={curPos}
          />
          {Component && (
            <Tooltip
              key={`anchorEl-tooltip-${index}`}
              show={show}
              anchorEl={el}
              pos={Number(el.dataset.tourguidePosition)}
              curPos={curPos}
              animated
            >
              {Array.isArray(Component) || isValidElement(Component) ? (
                Component
              ) : (
                <Component>{content && content[index]}</Component>
              )}
            </Tooltip>
          )}
        </>
      ))}
    </>
  );
};
export default Tourguide;
