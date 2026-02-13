import { useCallback, useEffect, useRef, useState } from 'react';

type SwitchControl = {
  startTime: number | null;
  timeoutId: ReturnType<typeof setTimeout> | null;
};

export function useMinDurationLoading(minDuration: number) {
  const [loading, setLoading] = useState(false);
  const ctrlRef = useRef<SwitchControl>({ startTime: null, timeoutId: null });

  const start = useCallback(() => {
    const ctrl = ctrlRef.current;
    ctrl.startTime = Date.now();
    setLoading(true);
  }, []);

  const end = useCallback(() => {
    const ctrl = ctrlRef.current;

    const elapsed = Date.now() - (ctrl.startTime ?? Date.now());
    const remaining = Math.max(minDuration - elapsed, 0);

    if (ctrl.timeoutId) clearTimeout(ctrl.timeoutId);

    ctrl.timeoutId = setTimeout(() => {
      setLoading(false);
      ctrl.startTime = null;
      ctrl.timeoutId = null;
    }, remaining);
  }, [minDuration]);

  useEffect(() => {
    return () => {
      const { timeoutId } = ctrlRef.current;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { loading, start, end };
}
