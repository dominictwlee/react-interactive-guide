import { useState, useCallback, useMemo, useEffect } from 'react';

export type UseTourguideProps = ReturnType<typeof useTourguide>;

type TourGuideStatus = 'idle' | 'initializing' | 'ready';

type TourGuideAnchor = {
  position: number;
  node: HTMLElement;
};

export default function useTourguide() {
  const [allAnchorEls, setAllAnchorEls] = useState<TourGuideAnchor[]>([]);
  const [anchorEls, setAnchorEls] = useState<TourGuideAnchor[]>([]);
  const [show, setShow] = useState(false);
  const [curPos, setCurPos] = useState(0);
  const [status, setStatus] = useState<TourGuideStatus>('idle');

  const handleRef = useCallback(
    (position: number) => (node: HTMLElement | null) => {
      if (
        node !== null &&
        typeof position === 'number' &&
        !node.isEqualNode(allAnchorEls[position]?.node)
      ) {
        setAllAnchorEls((prevEls) => {
          const anchors = [...prevEls];
          anchors[position] = {
            node,
            position,
          };
          return anchors;
        });
        if (status === 'idle') {
          setStatus('initializing');
        }
      }
    },
    [status, allAnchorEls]
  );

  const getAnchorElProps = useCallback(
    (position: number) => ({
      ref: handleRef(position),
    }),
    [handleRef]
  );

  const toggle = useCallback(() => {
    setShow((prevShow) => !prevShow);
  }, []);

  const close = useCallback(() => {
    setShow(false);
    setCurPos(0);
  }, []);

  const next = useCallback(() => {
    setCurPos((prevCurPos) => {
      if (prevCurPos >= anchorEls.length - 1) {
        return prevCurPos;
      }

      return prevCurPos + 1;
    });
  }, [anchorEls.length]);

  const prev = useCallback(() => {
    setCurPos((prevCurPos) => (prevCurPos === 0 ? prevCurPos : prevCurPos - 1));
  }, []);

  const reset = useCallback(() => {
    setShow(false);
    setAnchorEls([]);
    setCurPos(0);
    setStatus('idle');
  }, []);

  const filterMissingAnchors = () => {
    // removes missing anchors and reassigns positions
    const newAnchors = allAnchorEls
      .filter((item) => !!item)
      .map((item, index) => ({
        node: item.node,
        position: index,
      }));

    setAnchorEls(newAnchors);
  };

  useEffect(filterMissingAnchors, [allAnchorEls.length]);

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
      allAnchorEls,
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
      allAnchorEls,
    ]
  );
}
