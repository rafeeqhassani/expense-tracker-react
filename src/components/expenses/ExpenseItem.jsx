function ExpenseItem({ expense, onDelete, onEdit, onToggleSelected }) {
  const amount = Number(expense.amount || 0);

  return (
    <tr>
      <td>
        <label className="row-checkbox">
          <input
            type="checkbox"
            checked={expense.selected}
            onChange={() => onToggleSelected(expense.id)}
          />
          <span className="row-checkbox-text">Select</span>
        </label>
      </td>

      <td>{expense.title}</td>

      <td className="category-badge">{expense.category}</td>

      <td>
        {new Date(expense.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td
        className={
          amount > 50000
            ? "amount high"
            : amount > 20000
              ? "amount medium"
              : "amount"
        }
      >
        {Number(expense.amount || 0).toLocaleString("en-PK", {
          style: "currency",
          currency: "PKR",
        })}
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
