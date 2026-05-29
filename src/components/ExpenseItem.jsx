function ExpenseItems({ expense, onDelete, onEdit, isChecked }) {
  return (
    <div className="expense-card">
      <div className="info-container">
        <h3>{expense.title}</h3>
        <p className="amount">
          {expense.amount.toLocaleString("en-PK", {
            style: "currency",
            currency: "PKR",
          })}
        </p>
        <p className="meta-info">
          <span className="category">{expense.category}</span>
          <span className="dot">.</span>
          <span className="date">
            {new Date(expense.date).toLocaleDateString("en-GB")}
          </span>
        </p>
      </div>
      <div className="action-container">
        <button
          type="button"
          className="delete-expense"
          onClick={() => onDelete(expense.id)}
        >
          X
        </button>

        <button
          type="button"
          className="edit-expense"
          onClick={() => onEdit(expense.id)}
        >
          Edit
        </button>
        <input
          type="checkbox"
          className="select-expense"
          checked={expense.selected}
          onChange={(e) => isChecked(expense.id, e.target.checked)}
        ></input>
      </div>
    </div>
  );
}

export default ExpenseItems;
