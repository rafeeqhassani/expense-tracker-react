import BudgetAlert from "./BudgetAlert";

function BudgetAlertList({ alerts = [] }) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="budget-alert-list">
      {alerts.map((alert) => (
        <BudgetAlert
          key={`${alert.scope}-${alert.category ?? "monthly"}`}
          alert={alert}
        />
      ))}
    </div>
  );
}

export default BudgetAlertList;
