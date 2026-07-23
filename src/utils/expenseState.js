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
