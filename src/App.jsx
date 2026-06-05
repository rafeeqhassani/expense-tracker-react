import Header from "./components/Header";
import Filters from "./components/Filters";
import ExpenseList from "./components/ExpenseList";
import ActionsBar from "./components/ActionsBar";
import ExpenseForm from "./components/ExpenseForm";
import Toast from "./components/Toast";
import useExpenses from "./hooks/useExpenses";
import useFilters from "./hooks/useFilters";
import useExpenseForm from "./hooks/useExpenseForm";

import useToast from "./hooks/useToast";

function App() {
  const {
    expenses,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
    handleCheckboxChange,
    handleClearSelected,
    handleClearAll,
  } = useExpenses();

  const { toast, showToastMessage } = useToast();

  const {
    formData,
    mode,
    handleChange,
    handleSubmit,
    isFormOpen,
    openForm,
    closeForm,
    handleEditExpense,
    errors,
    touched,
    submitAttempted,
  } = useExpenseForm({
    expenses,
    handleAddExpense,
    handleUpdateExpense,
    showToastMessage,
  });

  const {
    categories,
    filters,
    handleFilterChange,
    totalAmount,
    filteredTotal,
    limitedExpenses,
    handleLoadMore,
    resetFilters,
    hasActiveFilters,
    hasExpenses,
    hasMoreExpenses,
  } = useFilters(expenses);

  return (
    <>
      <main>
        <Header
          total={totalAmount}
          monthlyTotal={filteredTotal}
          showForm={openForm}
        />

        <Filters filters={filters} handleFilterChange={handleFilterChange} />

        <ExpenseList
          expenses={limitedExpenses}
          searchQuery={filters.title}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
          isChecked={handleCheckboxChange}
        />
        <ActionsBar
          onLoadMore={handleLoadMore}
          hasExpenses={hasExpenses}
          hasMoreExpenses={hasMoreExpenses}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
          onClearSelected={handleClearSelected}
          onClearAll={handleClearAll}
        />
      </main>
      {isFormOpen && (
        <div className={`modal`}>
          <ExpenseForm
            categories={categories}
            onSubmit={handleSubmit}
            mode={mode}
            closeForm={closeForm}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            submitAttempted={submitAttempted}
            touched={touched}
          />
        </div>
      )}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </>
  );
}

export default App;
