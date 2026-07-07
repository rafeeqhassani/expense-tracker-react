export function addExpense(expenses, newExpense) {
  const added = [...expenses, newExpense];
  return added;
}

export function deleteExpense(expenses, id) {
  let deletedItem = null;
  const updatedExpenses = expenses.map((item) => {
    if (item.id === id) {
      deletedItem = item;
      return { ...item, deleted: true };
    }
    return item;
  });
  return { updatedExpenses, deletedItem };
}

export function restoreExpense(expenses, expenseToRestore) {
  return expenses.map((item) =>
    item.id === expenseToRestore.id ? { ...item, deleted: false } : item,
  );
}

export function updateExpense(expenses, editingId, updatedData) {
  return expenses.map((item) =>
    item.id === editingId ? { ...item, ...updatedData } : item,
  );
}

export function deleteSelectedExpenses(expenses, selectedSet) {
  return expenses.filter((item) => !selectedSet.has(item.id));
}

export function toggleSelectedExpense(prevSet, id) {
  const next = new Set(prevSet);

  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }

  return next;
}

export function selectAllExpenses(expenses) {
  return new Set(expenses.map((e) => e.id));
}

export function deselectAllExpenses() {
  return new Set();
}

export function getSelectedCount(selectedSet) {
  return selectedSet.size;
}

export function areAllSelected(expenses, selectedSet) {
  return expenses.length > 0 && expenses.every((e) => selectedSet.has(e.id));
}

export function areSomeSelected(expenses, selectedSet) {
  return selectedSet.size > 0 && selectedSet.size < expenses.length;
}
