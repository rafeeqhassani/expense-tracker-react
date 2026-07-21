export function getUniqueCategories(expenses) {
  return [...new Set(expenses.map((expense) => expense.category))];
}
