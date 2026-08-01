import { useRef, useEffect, useCallback } from "react";

const INITIAL_DELAY_MS = 400;
const REPEAT_INTERVAL_MS = 100;

function useHoldButton() {
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const actionRef = useRef(null);

  const stop = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    timeoutRef.current = null;
    intervalRef.current = null;
    actionRef.current = null;
  }, []);

  const start = useCallback(
    (action) => {
      stop();

      actionRef.current = action;

      action();

      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          actionRef.current?.();
        }, REPEAT_INTERVAL_MS);
      }, INITIAL_DELAY_MS);
    },
    [stop],
  );

  useEffect(() => stop, [stop]);

  return { start, stop };
}

export default useHoldButton;
