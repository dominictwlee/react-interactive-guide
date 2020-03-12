import { useMemo } from 'react';

export function useForkRef(refA: any, refB: any) {
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return (element: any) => {
      setRef(refA, element);
      setRef(refB, element);
    };
  }, [refA, refB]);
}

export function setRef<T>(ref: any, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
