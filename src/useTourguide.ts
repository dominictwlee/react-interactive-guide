import { useState, useCallback, useMemo } from 'react';

export default function useTourguide() {
  const [anchorEls, setAnchorEls] = useState<HTMLElement[]>([]);
  const [show, setShow] = useState(false);
  const [curPos, setCurPos] = useState(0);
  const curAnchorEl = useMemo(() => {
    if (!anchorEls[curPos]) {
      return null;
    }

    return anchorEls[curPos];
  }, [anchorEls, curPos]);

  const handleRef = useCallback((node: HTMLElement) => {
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
    anchorEl: curAnchorEl,
    anchorEls,
    curPos,
    getAnchorElProps,
    setShow,
    setCurPos,
    toggle,
    handleRef,
  };
}
