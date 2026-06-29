function BudgetAlert({ alert }) {
  const getTypeClass = (type) => {
    switch (type) {
      case "safe":
        return "alert-safe";
      case "warning":
        return "alert-warning";
      case "high":
        return "alert-high";
      case "over":
        return "alert-over";
      default:
        return "";
    }
  };

  return (
    <div className={`budget-alert ${getTypeClass(alert.type)}`}>
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
