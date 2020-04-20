import TourguideContext from './TourguideContext';
import { useContext } from 'react';

export default function useGuide() {
  const guideContext = useContext(TourguideContext);

  if (!guideContext) {
    throw new Error('useGuide must be used within TourguideProvider');
  }

  return guideContext;
}
