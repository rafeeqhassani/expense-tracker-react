import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, searchQuery, onDelete, onEdit }) {
  const isSearching = searchQuery.trim() !== "";

  if (expenses.length === 0) {
    return (
      <section className="expense-list">
        <div className="empty-state">
          {isSearching ? "No transactions found" : "No transactions yet"}
        </div>
      </section>
    );
  }

  return (
    <section className="expense-list">
      <div className="expense-table-container">
        <div className="expense-table-scroll">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ExpenseList;
