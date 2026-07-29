export function editExpense(expenses, id) {
  return expenses.find((expense) => expense.id === id && !expense.deleted);
}

export function validateForm(formData) {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Title is required";
  } else if (!isNaN(formData.title)) {
    errors.title = "Title cannot be a number";
  } else if (formData.title.trim().length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  }

  if (!formData.amount || Number(formData.amount) <= 0) {
    errors.amount = "Amount must be positive";
  } else if (Number(formData.amount) > 999999999.99) {
    errors.amount = "Amount is too large";
  } else if (!/^\d+(\.\d{1,2})?$/.test(formData.amount)) {
    errors.amount = "Amount can have maximum 2 decimal places";
  }

  const finalCategory =
    formData.customCategory.trim() || formData.category.trim();

  if (!finalCategory) {
    errors.category = "Please select or enter a category";
  } else if (!isNaN(finalCategory)) {
    errors.category = "Category cannot be a number";
  }

  if (!formData.date) {
    errors.date = "Date is required";
  } else if (isNaN(Date.parse(formData.date))) {
    errors.date = "Invalid date";
  } else if (new Date(formData.date) > new Date()) {
    errors.date = "Date cannot be in the future";
  }

  return errors;
}
