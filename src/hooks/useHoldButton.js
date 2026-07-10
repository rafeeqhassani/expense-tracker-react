import { useRef, useEffect, useCallback } from "react";

// Timing for press-and-hold repeat behavior (e.g. a "+"/"-" stepper button
// held down): fire once immediately, wait INITIAL_DELAY_MS before repeating,
// then repeat every REPEAT_INTERVAL_MS until released.
const INITIAL_DELAY_MS = 400;
const REPEAT_INTERVAL_MS = 60;

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
      intervalRef.current = setInterval(action, REPEAT_INTERVAL_MS);
    }, INITIAL_DELAY_MS);
  }, []);

  // Ensure any pending timeout/interval is cleared if the component unmounts
  // mid-hold.
  useEffect(() => stop, [stop]);

  return { start, stop };
}

export default useHoldButton;
