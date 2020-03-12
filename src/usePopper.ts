import { useRef, useCallback, useLayoutEffect, useEffect, useState, Ref } from 'react';
import { createPopper, Options, Instance } from '@popperjs/core';
import { useForkRef } from './refUtils';

type usePopperProps = {
  anchorEl: Element;
  popperOptions: Partial<Options> | null;
  ref: Ref<any>;
  show: boolean;
};

export default function usePopper(props: usePopperProps) {
  const { anchorEl, popperOptions, ref, show } = props;
  const [idle, setIdle] = useState(true);
  const tooltipRef = useRef<HTMLElement | null>(null);
  const selfRef = useForkRef(tooltipRef, ref);
  const popperInstanceRef = useRef<Instance | null>(null);

  const create = useCallback(() => {
    if (!anchorEl || !popperOptions || !tooltipRef.current || !show) {
      return;
    }

    popperInstanceRef.current = createPopper(anchorEl, tooltipRef.current, popperOptions);
  }, [anchorEl, popperOptions, show]);

  const destroy = useCallback(() => {
    if (popperInstanceRef.current != null) {
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

  return {
    selfRef,
    tooltipRef,
    handleAnimStart,
    handleAnimIdle,
    idle,
  };
}
