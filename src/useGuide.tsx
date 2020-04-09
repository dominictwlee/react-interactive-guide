import TourguideContext from './TourguideContext';
import { useContext } from 'react';

export default function useGuide() {
  const guide = useContext(TourguideContext);

  if (!guide) {
    throw new Error('useGuide must be used within TourguideProvider');
  }

  return guide;
}
