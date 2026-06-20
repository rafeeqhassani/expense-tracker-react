import useExpenses from "./hooks/useExpenses";
import useFilters from "./hooks/useFilters";
import useExpenseForm from "./hooks/useExpenseForm";
import useToast from "./hooks/useToast";

import MainLayout from "./components/layout/MainLayout";

function App() {
  const { toast, showToastMessage } = useToast();

  const expensesHook = useExpenses(showToastMessage);

  const formHook = useExpenseForm({
    expenses: expensesHook.expenses,
    handleAddExpense: expensesHook.handleAddExpense,
    handleUpdateExpense: expensesHook.handleUpdateExpense,
    showToastMessage,
  });

  const filtersHook = useFilters(expensesHook.expenses);

  return (
    <MainLayout
      data={{
        visibleExpenses: filtersHook.limitedExpenses,
        filteredExpenses: filtersHook.filteredExpenses,
        visibleCount: filtersHook.visibleCount,
        categories: filtersHook.categories,
        filters: filtersHook.filters,
        totals: {
          totalAmount: filtersHook.totalAmount,
          filteredTotal: filtersHook.filteredTotal,
          totalRecords: filtersHook.totalRecords,
        },
      }}
      form={{
        formData: formHook.formData,
        mode: formHook.mode,
        isOpen: formHook.isFormOpen,
        errors: formHook.errors,
        touched: formHook.touched,
        submitAttempted: formHook.submitAttempted,
      }}
      toast={toast}
      actions={{
        openForm: formHook.openForm,
        closeForm: formHook.closeForm,
        handleEditExpense: formHook.handleEditExpense,
        handleSubmit: formHook.handleSubmit,
        handleChange: formHook.handleChange,

        handleDeleteExpense: expensesHook.handleDeleteExpense,
        handleToggleSelected: expensesHook.handleToggleSelected,
        allSelected: expensesHook.allSelected,
        someSelected: expensesHook.someSelected,
        selectedCount: expensesHook.selectedCount,
        handleSelectAll: expensesHook.handleSelectAll,
        handleDeselectAll: expensesHook.handleDeselectAll,
        handleClearSelected: expensesHook.handleClearSelected,
        handleClearAll: expensesHook.handleClearAll,

        mockExpenses: expensesHook.handleGenerateMockData,

        handleFilterChange: filtersHook.handleFilterChange,
        handleLoadMore: filtersHook.handleLoadMore,
        resetFilters: filtersHook.resetFilters,
        hasActiveFilters: filtersHook.hasActiveFilters,
      }}
    />
  );
}

export default App;
