import React, { ReactElement } from 'react';
import Spotlight from './Spotlight';

type TourguideProps = {
  animated?: boolean;
  tooltip?: ReactElement;
  show: boolean;
  curPos: number;
  anchorEls: HTMLElement[];
};

const Tourguide = (props: TourguideProps) => {
  const { tooltip: Tooltip, animated, anchorEls, ...restProps } = props;
  return (
    <>
      {anchorEls.map((el, index) => (
        <Spotlight
          key={`anchorEl-child-${index}`}
          anchorEl={el}
          pos={Number(el.dataset.tourguidePosition)}
          animated
          {...restProps}
        />
      ))}
    </>
  );
};
export default Tourguide;
