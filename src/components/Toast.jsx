function Toast({ show, message, type }) {
  if (!show) return null;
  return (
    <div className={`toast toast-${type}`}>
      <p>{message}</p>
    </div>
  );
}
export default Toast;
