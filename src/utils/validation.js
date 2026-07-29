function validateEmail(email) {
  if (!email.trim()) {
    return "Email is required";
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Invalid email format";
  }

  return null;
}

function validatePassword(password) {
  if (!password.trim()) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}

function validateText(value, fieldName) {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  if (!isNaN(value)) {
    return `${fieldName} cannot be a number`;
  }

  return null;
}

function validateCategory(customCategory, category) {
  const finalCategory = customCategory.trim() || category.trim();

  if (!finalCategory) {
    return "Please select or enter a category";
  }

  if (!isNaN(finalCategory)) {
    return "Category cannot be a number";
  }

  return null;
}

function validateAmount(amount) {
  if (!amount || Number(amount) <= 0) {
    return "Amount must be positive";
  }

  if (Number(amount) > 999999999.99) {
    return "Amount is too large";
  }

  if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
    return "Amount can have maximum 2 decimal places";
  }

  return null;
}

function validateDate(date) {
  if (!date) {
    return "Date is required";
  }

  if (isNaN(Date.parse(date))) {
    return "Invalid date";
  }

  if (new Date(date) > new Date()) {
    return "Date cannot be in the future";
  }

  return null;
}

export function validateLoginForm(data) {
  const errors = {};

  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function validateRegisterForm(data) {
  const errors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function validateExpenseForm(formData) {
  const errors = {};

  const titleError = validateText(formData.title, "Title");

  if (titleError) {
    errors.title = titleError;
  } else if (formData.title.trim().length > 100) {
    errors.title = "Title cannot exceed 100 characters";
  }

  const amountError = validateAmount(formData.amount);

  if (amountError) {
    errors.amount = amountError;
  }

  const categoryError = validateCategory(
    formData.customCategory,
    formData.category,
  );

  if (categoryError) {
    errors.category = categoryError;
  }

  const dateError = validateDate(formData.date);

  if (dateError) {
    errors.date = dateError;
  }

  return errors;
}
