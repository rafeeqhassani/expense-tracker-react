import ExpenseItems from "./ExpenseItem";

function ExpenseList({
  expenses,
  searchQuery,
  onDelete,
  onEdit,
  isChecked,

}) {
  const isSearching = searchQuery.trim() !== "";
  let content;

  if (isSearching && expenses.length === 0) {
    content = <p className="empty-list-message">No expenses found</p>;
  } else if (expenses.length === 0) {
    content = <p className="empty-list-message">No expenses added yet</p>;
  } else {
    content = expenses.map((expense) => (
      <ExpenseItems
        key={expense.id}
        expense={expense}
        onDelete={onDelete}
        onEdit={onEdit}
        isChecked={isChecked}
      
      />
    ));
  }
  return <section className="list-container">{content}</section>;
}

export default ExpenseList;
