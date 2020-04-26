import { useState } from 'react';

type AnimLifecycle = 'idle' | 'standby' | 'active';

type useAnimLifecycleProps = {
  show: boolean;
  curPos: number;
  pos: number;
  destroy: () => void;
};

export default function useAnimLifecycle({
  show,
  curPos,
  pos,
  destroy,
}: useAnimLifecycleProps) {
  const [animLifecycle, setAnimLifecycle] = useState<AnimLifecycle>('idle');

  const handleAnimStart = () => {
    if (show && curPos === pos) {
      setAnimLifecycle('active');
    }
  };

  const handleAnimRest = () => {
    if (!show) {
      destroy();
      setAnimLifecycle('idle');
    } else if (curPos !== pos) {
      setAnimLifecycle('standby');
    }
  };

  return { handleAnimStart, handleAnimRest, animLifecycle };
}
