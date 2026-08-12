function Toast({ show, message, type = "info" }) {
  if (!show) {
    return null;
  }

  return (
    <p
      className={`toast-message toast-${type}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}

export default Toast;
