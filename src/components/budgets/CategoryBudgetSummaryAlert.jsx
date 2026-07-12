import { useNavigate } from "react-router-dom";
import BudgetAlert from "./BudgetAlert";

function CategoryBudgetSummaryAlert({ summary }) {
  const navigate = useNavigate();

  if (!summary || summary.notSetCount === 0) {
    return null;
  }

  const count = summary.notSetCount;

  const alert = {
    type: "info",
    scope: "summary",
    message:
      count === 1
        ? "1 category budget need setup."
        : `${count} category budgets need setup.`,
  };

  const handleManageBudget = () => {
    navigate("/budget?tab=category");
  };

  return (
    <div>
      <BudgetAlert alert={alert}>
        <button
          type="button"
          className="manage-budget-button"
          onClick={handleManageBudget}
        >
          Manage Budget
        </button>
      </BudgetAlert>
    </div>
  );
}

export default CategoryBudgetSummaryAlert;
