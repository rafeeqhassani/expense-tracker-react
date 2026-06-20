import ExpenseItem from "./ExpenseItem";

function ExpenseList({
  expenses,
  searchQuery,
  onDelete,
  onEdit,
  onToggleSelected,
}) {
  const isSearching = searchQuery.trim() !== "";

  if (expenses.length === 0) {
    return (
      <section className="list-container">
        <p className="empty-list-message">
          {isSearching ? "No expenses found" : "No expenses added yet"}
        </p>
      </section>
    );
  }

  return (
    <section className="list-container">
      <div className="table-wrapper">
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
                onToggleSelected={onToggleSelected}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default ExpenseList;
