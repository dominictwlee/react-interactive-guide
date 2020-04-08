import { useState, useCallback } from 'react';

export default function useTourguide() {
  const [anchorEls, setAnchorEls] = useState<HTMLElement[]>([]);
  const [show, setShow] = useState(false);
  const [curPos, setCurPos] = useState(0);

  const handleRef = useCallback((node: HTMLElement | null) => {
    if (node !== null && node.dataset.tourguidePosition) {
      setAnchorEls(prevEls => {
        const anchors = [...prevEls];
        anchors[Number(node.dataset.tourguidePosition)] = node;
        return anchors;
      });
    }
  }, []);

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

  const next = useCallback(() => {
    setCurPos(prevCurPos => prevCurPos + 1);
  }, []);

  const prev = useCallback(() => {
    setCurPos(prevCurPos => (prevCurPos === 0 ? prevCurPos : prevCurPos - 1));
  }, []);

  const destroy = useCallback(() => {
    setShow(false);
    setAnchorEls([]);
    setCurPos(0);
  }, []);

  return {
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
    destroy,
  };
}
