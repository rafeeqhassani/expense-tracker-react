function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-content">
        <h3>Something went wrong</h3>

        <p>{message}</p>

        {onRetry && (
          <button type="button" onClick={onRetry} className="error-retry">
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;
