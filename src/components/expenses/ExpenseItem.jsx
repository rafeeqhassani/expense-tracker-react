function ExpenseItem({ expense, onDelete, onEdit, isChecked }) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={expense.selected}
          onChange={(e) => isChecked(expense.id, e.target.checked)}
        />
      </td>

      <td>{expense.title}</td>

      <td>{expense.category}</td>

      <td>{new Date(expense.date).toLocaleDateString("en-GB")}</td>

      <td className="amount">
        {Number(expense.amount || 0).toLocaleString("en-PK", {
          style: "currency",
          currency: "PKR",
        })}
      </td>

      <td className="actions">
        <button type="button" onClick={() => onEdit(expense.id)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ExpenseItem;
