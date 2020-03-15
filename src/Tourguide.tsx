import React, { ReactElement } from 'react';
import Spotlight from './Spotlight';
import Tooltip from './Tooltip';

type TourguideProps = {
  animated?: boolean;
  tooltip?: ReactElement;
  show: boolean;
  curPos: number;
  anchorEls: HTMLElement[];
};

const Tourguide = (props: TourguideProps) => {
  const { tooltip: Component, animated, anchorEls, curPos, show } = props;

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
          <Tooltip
            key={`anchorEl-tooltip-${index}`}
            show={show}
            anchorEl={el}
            pos={Number(el.dataset.tourguidePosition)}
            curPos={curPos}
            animated
          />
        </>
      ))}
    </>
  );
};
export default Tourguide;
