const ALERT_TYPE_CLASSES = {
  safe: "alert-safe",
  warning: "alert-warning",
  high: "alert-high",
  over: "alert-over",
  info: "alert-info",
};

function BudgetAlert({ alert, children }) {
  const typeClass = ALERT_TYPE_CLASSES[alert.type] || "alert-info";

  return (
    <div className={`budget-alert ${typeClass}`} role="status">
      <p className="alert-message">{alert.message}</p>

      {alert.scope === "category" && (
        <div className="alert-category">
          Category: <b>{alert.category}</b>
        </div>
      )}

      {children}
    </div>
  );
}

export default BudgetAlert;
