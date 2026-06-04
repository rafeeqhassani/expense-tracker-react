function ExpenseItems({ expense, onDelete, onEdit, isChecked }) {
  return (
    <div className="expense-card">
      <input
        type="checkbox"
        className="select-expense"
        checked={expense.selected}
        onChange={(e) => isChecked(expense.id, e.target.checked)}
      ></input>
      <div className="info-container">
        <h4>{expense.title}</h4>
        <p className="meta-info">
          <span className="category">{expense.category}</span>
          <span className="dot">.</span>
          <span className="date">
            {new Date(expense.date).toLocaleDateString("en-GB")}
          </span>
        </p>
      </div>
      <div className="right-container">
        <span className="amount">
          {expense.amount.toLocaleString("en-PK", {
            style: "currency",
            currency: "PKR",
          })}
        </span>

        <div className="action-container">
          <button
            type="button"
            className="delete-btn"
            onClick={() => onDelete(expense.id)}
          >
            X
          </button>

          <button
            type="button"
            className="edit-btn"
            onClick={() => onEdit(expense.id)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItems;
