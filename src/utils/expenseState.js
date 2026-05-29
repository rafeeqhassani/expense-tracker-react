export function addExpense(expenses, newExpense) {
  const added = [...expenses, newExpense];
  return added;
}

export function deleteExpense(expenses, id) {
  return expenses.filter((item) => item.id !== id);
}

export function updateExpense(expenses, editingId, updatedData) {
  return expenses.map((item) =>
    item.id === editingId ? { ...item, ...updatedData } : item,
  );
}

export function clearSelectedExpenses(expenses) {
  return expenses.filter((item) => !item.selected);
}

export function checkboxChange(expenses, id, onCheckboxChange) {
  return expenses.map((item) =>
    item.id === id ? { ...item, selected: onCheckboxChange } : item,
  );
}
