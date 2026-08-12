import useAppContext from "../../providers/useAppContext";
import { formatCurrency } from "../../utils/formatters";

const HIGH_AMOUNT_THRESHOLD = 50000;
const MEDIUM_AMOUNT_THRESHOLD = 20000;

function getAmountClassName(amount) {
  if (amount > HIGH_AMOUNT_THRESHOLD) return "amount high";
  if (amount > MEDIUM_AMOUNT_THRESHOLD) return "amount medium";
  return "amount";
}

function ExpenseItem({ expense, onDelete, onEdit }) {
  const { actions } = useAppContext();

  const amount = Number(expense.amount || 0);
  const isSelected = actions.selectedIds.has(expense.id);

  return (
    <tr>
      <td className="select-cell">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => actions.handleToggleSelected(expense.id)}
          />

          <span>Select</span>
        </label>
      </td>

      <td>{expense.title}</td>

      <td>
        <span className="category-badge">{expense.category}</span>
      </td>

      <td>
        {new Date(expense.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td className={getAmountClassName(amount)}>
        {formatCurrency(expense.amount || 0)}
      </td>

      <td className="actions">
        <button
          type="button"
          className="edit-btn"
          onClick={() => onEdit(expense.id)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
