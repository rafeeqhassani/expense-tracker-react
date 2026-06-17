function Toast({ show, message, type }) {
  if (!show) return null;

  return (
    <div className="toast-container">
      <p className={`toast-message toast-${type}`}>{message}</p>
    </div>
  );
}

export default Toast;
