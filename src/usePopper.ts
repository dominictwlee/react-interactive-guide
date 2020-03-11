import { useRef, useCallback, useLayoutEffect, useEffect, useState } from 'react';
import { createPopper } from '@popperjs/core';
import { useForkRef } from './refUtils';

export default function usePopper(props) {
  const { anchorEl, popperOptions, ref, show, animated } = props;
  const [idle, setIdle] = useState(true);
  const tooltipRef = useRef(null);
  const selfRef = useForkRef(tooltipRef, ref);
  const popperInstanceRef = useRef(null);

  const create = useCallback(() => {
    if (!anchorEl || !popperOptions || !tooltipRef.current || !show) {
      return;
    }

    popperInstanceRef.current = createPopper(anchorEl, tooltipRef.current, {
      ...popperOptions,
    });
  }, [anchorEl, popperOptions, show]);

  const destroy = useCallback(() => {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.destroy();
      popperInstanceRef.current = null;
    }
  }, []);

  const handleAnimStart = () => {
    setIdle(false);
  };

  const handleAnimIdle = () => {
    setIdle(true);
    destroy();
  };

  // Recreate on popper change
  useLayoutEffect(() => {
    create();
  }, [create]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      destroy();
    };
  }, [destroy]);

  // Destroy if not animated
  useEffect(() => {
    if (!show && !animated) {
      destroy();
    }
  }, [show, animated, destroy]);

  return {
    selfRef,
    tooltipRef,
    handleAnimStart,
    handleAnimIdle,
    idle,
  };
}
