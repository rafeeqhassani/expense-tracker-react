const ALERT_TYPE_CLASSES = {
  safe: "alert-safe",
  warning: "alert-warning",
  high: "alert-high",
  over: "alert-over",
  info: "alert-info",
};

function BudgetAlert({ alert }) {
  const typeClass = ALERT_TYPE_CLASSES[alert.type] || "";

  return (
    <div className={`budget-alert ${typeClass}`}>
      <div className="alert-message">{alert.message}</div>

      {alert.scope === "category" && (
        <div className="alert-category">
          Category: <b>{alert.category}</b>
        </div>
      )}
    </div>
  );
}

export default BudgetAlert;
