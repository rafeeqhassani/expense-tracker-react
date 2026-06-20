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

export function toggleSelectedExpense(expenses, id) {
  return expenses.map((item) =>
    item.id === id ? { ...item, selected: !item.selected } : item,
  );
}

export function selectedAllExpenses(expenses) {
  return expenses.map((item) => ({ ...item, selected: true }));
}
export function deselectAllExpenses(expenses) {
  return expenses.map((item) => ({ ...item, selected: false }));
}

export function getSelectedCount(expenses) {
  return expenses.filter((item) => item.selected).length;
}

export function areAllSelected(expenses) {
  return expenses.length > 0 && expenses.every((item) => item.selected);
}

export function areSomeSelected(expenses) {
  return expenses.some((item) => item.selected) && !areAllSelected(expenses);
}
