import { createContext } from 'react';
import { UseTourguideProps } from './useTourguide';

const TourguideContext = createContext<UseTourguideProps | null>(null);

export default TourguideContext;
