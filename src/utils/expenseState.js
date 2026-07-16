export function addExpense(expenses, newExpense) {
  return [...expenses, newExpense];
}

export function deleteExpense(expenses, id) {
  const deletedItem = expenses.find((item) => item.id === id) ?? null;

  const updatedExpenses = expenses.map((item) =>
    item.id === id ? { ...item, deleted: true } : item,
  );

  return { updatedExpenses, deletedItem };
}

export function updateExpense(expenses, id, updatedData) {
  return expenses.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item,
  );
}

export function deleteSelectedExpenses(expenses, selectedIds) {
  return expenses.filter((item) => !selectedIds.has(item.id));
}

export function toggleSelectedExpense(selectedIds, id) {
  const nextSelectedIds = new Set(selectedIds);

  if (nextSelectedIds.has(id)) {
    nextSelectedIds.delete(id);
  } else {
    nextSelectedIds.add(id);
  }

  return nextSelectedIds;
}

export function selectAllExpenses(expenses) {
  return new Set(expenses.map((item) => item.id));
}

export function deselectAllExpenses() {
  return new Set();
}

export function getSelectedCount(selectedIds) {
  return selectedIds.size;
}

export function areAllSelected(expenses, selectedIds) {
  return (
    expenses.length > 0 && expenses.every((item) => selectedIds.has(item.id))
  );
}

export function areSomeSelected(expenses, selectedIds) {
  return selectedIds.size > 0 && selectedIds.size < expenses.length;
}
