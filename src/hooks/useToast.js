import { useState, useRef, useCallback, useEffect } from "react";

const TOAST_DURATION_MS = 3000;

const HIDDEN_TOAST = { show: false, message: "", type: "" };

function useToast() {
  const toastTimerRef = useRef(null);
  const [toast, setToast] = useState(HIDDEN_TOAST);

  useEffect(() => {
    return () => clearTimeout(toastTimerRef.current);
  }, []);

  const showToastMessage = useCallback((message, type = "success") => {
    clearTimeout(toastTimerRef.current);

    setToast({ show: true, message, type });

    toastTimerRef.current = setTimeout(() => {
      setToast(HIDDEN_TOAST);
    }, TOAST_DURATION_MS);
  }, []);

  return {
    toast,
    showToastMessage,
  };
}

export default useToast;
