import { useNavigate } from "react-router-dom";
import BudgetAlert from "./BudgetAlert";

function MonthlyBudgetSummaryAlert({ summary }) {
  const navigate = useNavigate();

  if (!summary?.notSet) {
    return null;
  }

  const alert = {
    type: "info",
    scope: "monthly-summary",
    message: "Monthly budget need setup.",
  };

  const handleManageBudget = () => {
    navigate("/budget?tab=monthly");
  };

  return (
    <div>
      <BudgetAlert alert={alert}>
        <button
          type="button"
          className="manage-budget-button"
          onClick={handleManageBudget}
        >
          Set Monthly Budget
        </button>
      </BudgetAlert>
    </div>
  );
}

export default MonthlyBudgetSummaryAlert;
