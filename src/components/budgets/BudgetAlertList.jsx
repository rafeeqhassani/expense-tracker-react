import BudgetAlert from "./BudgetAlert";

function BudgetAlertList({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return <div className="no-alerts">All budgets are healthy ✅</div>;
  }

  return (
    <div className="budget-alert-list">
      {alerts.map((alert, index) => (
        <BudgetAlert
          key={`${alert.scope}-${alert.category || "monthly"}-${index}`}
          alert={alert}
        />
      ))}
    </div>
  );
}

export default BudgetAlertList;
