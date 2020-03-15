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

  const getAnchorElProps = (position: number) => ({
    ref: handleRef,
    'data-tourguide-position': position,
  });

  const toggle = () => {
    setShow(!show);
  };

  const next = () => {
    setCurPos(curPos + 1);
  };

  const prev = () => {
    setCurPos(curPos - 1);
  };

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
  };
}
