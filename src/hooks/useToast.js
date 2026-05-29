import { useState, useRef, useEffect } from "react";

function useToast() {
  const toastTimer = useRef(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    return () => clearTimeout(toastTimer.current);
  }, []);

  function showToastMessage(message, type = "success") {
    clearTimeout(toastTimer.current);

    setToast({
      show: true,
      message,
      type,
    });

    toastTimer.current = setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  }

  return {
    toast,
    showToastMessage,
  };
}

export default useToast;
