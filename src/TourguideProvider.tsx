import React, { FC } from 'react';
import TourguideContext from './TourguideContext';
import useTourguide from './useTourguide';

const TourguideProvider: FC = ({ children }) => {
  const tourguideProps = useTourguide();

  return (
    <TourguideContext.Provider value={tourguideProps}>
      {children}
    </TourguideContext.Provider>
  );
};

export default TourguideProvider;
