import { useMemo } from 'react';

export function useForkRef(refA, refB) {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return element => {
      setRef(refA, element);
      setRef(refB, element);
    };
  }, [refA, refB]);
}

export function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
