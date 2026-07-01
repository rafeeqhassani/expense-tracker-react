import { useRef, useEffect, useCallback } from "react";

function useHoldButton() {
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
  }, []);

  const start = useCallback((action) => {
    action();

    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(action, 60);
    }, 400);
  }, []);

  useEffect(() => stop, [stop]);

  return { start, stop };
}

export default useHoldButton;
