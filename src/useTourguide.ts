import { useState, useCallback, useMemo } from 'react';

export type UseTourguideProps = ReturnType<typeof useTourguide>;

type TourGuideStatus = 'idle' | 'initializing' | 'ready';

export default function useTourguide() {
  const [anchorEls, setAnchorEls] = useState<HTMLElement[]>([]);
  const [show, setShow] = useState(false);
  const [curPos, setCurPos] = useState(0);
  const [status, setStatus] = useState<TourGuideStatus>('idle');

  const handleRef = useCallback(
    (node: HTMLElement | null) => {
      if (node !== null && node.dataset.tourguidePosition) {
        setAnchorEls(prevEls => {
          const anchors = [...prevEls];
          anchors[Number(node.dataset.tourguidePosition)] = node;
          return anchors;
        });
        if (status === 'idle') {
          setStatus('initializing');
        }
      }
    },
    [status]
  );

  const getAnchorElProps = useCallback(
    (position: number) => ({
      ref: handleRef,
      'data-tourguide-position': position,
    }),
    [handleRef]
  );

  const toggle = useCallback(() => {
    setShow(prevShow => !prevShow);
  }, []);

  const close = useCallback(() => {
    setShow(false);
    setCurPos(0);
  }, []);

  const next = useCallback(() => {
    setCurPos(prevCurPos => {
      if (prevCurPos >= anchorEls.length - 1) {
        return prevCurPos;
      }

      return prevCurPos + 1;
    });
  }, [anchorEls.length]);

  const prev = useCallback(() => {
    setCurPos(prevCurPos => (prevCurPos === 0 ? prevCurPos : prevCurPos - 1));
  }, []);

  const reset = useCallback(() => {
    setShow(false);
    setAnchorEls([]);
    setCurPos(0);
    setStatus('idle');
  }, []);

  return useMemo(
    () => ({
      show,
      next,
      prev,
      anchorEls,
      curPos,
      getAnchorElProps,
      setShow,
      setCurPos,
      toggle,
      handleRef,
      reset,
      close,
      setStatus,
      status,
    }),
    [
      anchorEls,
      curPos,
      getAnchorElProps,
      handleRef,
      next,
      prev,
      reset,
      show,
      toggle,
      close,
      status,
    ]
  );
}
