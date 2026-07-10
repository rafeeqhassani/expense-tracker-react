import { useEffect, useRef } from "react";

const RECURRING_OPTIONS = [
  { value: "none", label: "None" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

function FormField({ label, htmlFor, error, children }) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error}
    </div>
  );
}

function ExpenseForm({
  categories,
  onSubmit,
  mode,
  closeForm,
  formData,
  handleChange,
  errors,
  submitAttempted,
  touched,
  isFormOpen,
}) {
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isFormOpen) {
      titleInputRef.current?.focus();
    }
  }, [isFormOpen]);

  const showError = (field) =>
    (submitAttempted || touched[field]) && errors[field];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <FormField
        label="Title"
        htmlFor="title"
        error={
          showError("title") && (
            <small className="validate-title">{errors.title}</small>
          )
        }
      >
        <input
          ref={titleInputRef}
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="title-input"
          placeholder="Add Expense"
        />
      </FormField>

      <FormField
        label="Amount"
        htmlFor="amount"
        error={
          showError("amount") && (
            <small className="validate-amount">{errors.amount}</small>
          )
        }
      >
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="amount-input"
          placeholder="e.g. 100.00"
        />
      </FormField>

      <div className="category-field">
        <div className="input-group">
          <div className="field">
            <label htmlFor="selectCategory">Select Category</label>

            <select
              id="selectCategory"
              name="category"
              className="select-category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="categoryInput">Category</label>

            <input
              type="text"
              id="categoryInput"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleChange}
              className="category-input"
              placeholder="Add New Category"
            />
          </div>
        </div>

        {showError("category") && (
          <small className="validate-category">{errors.category}</small>
        )}
      </div>

      <FormField
        label="Date"
        htmlFor="dateInput"
        error={
          showError("date") && (
            <small className="validate-date">{errors.date}</small>
          )
        }
      >
        <input
          type="date"
          id="dateInput"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="date-input"
        />
      </FormField>

      <FormField label="Recurring" htmlFor="recurring">
        <select
          id="recurring"
          name="recurring"
          value={formData.recurring}
          onChange={handleChange}
        >
          {RECURRING_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          {mode === "add" ? "Add Expense" : "Update Expense"}
        </button>

        <button type="button" className="close-form" onClick={closeForm}>
          Close
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
