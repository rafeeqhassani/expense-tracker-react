import useExpenses from "./hooks/useExpenses";
import useFilters from "./hooks/useFilters";
import useExpenseForm from "./hooks/useExpenseForm";
import useToast from "./hooks/useToast";

import MainLayout from "./components/layout/MainLayout";
import useReports from "./hooks/useReports";

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
  const reportsHook = useReports(
    expensesHook.expenses,
    filtersHook.processedExpenses,
  );

  return (
    <MainLayout
      data={{
        visibleExpenses: filtersHook.limitedExpenses,
        processedExpenses: filtersHook.processedExpenses,
        visibleCount: filtersHook.visibleCount,
        categories: filtersHook.categories,
        filters: filtersHook.filters,
      }}
      reports={{
        overall: {
          totalAmount: reportsHook.overall.total,
          totalRecords: reportsHook.overall.records,
          highestExpense: reportsHook.overall.highest,
          lowestExpense: reportsHook.overall.lowest,
          averageExpense: reportsHook.overall.average,
        },

        filtered: {
          totalAmount: reportsHook.filtered.total,
          totalRecords: reportsHook.filtered.records,
          highestExpense: reportsHook.filtered.highest,
          lowestExpense: reportsHook.filtered.lowest,
          averageExpense: reportsHook.filtered.average,
        },
      }}
      form={{
        formData: formHook.formData,
        mode: formHook.mode,
        isFormOpen: formHook.isFormOpen,
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

        handleFilterChange: filtersHook.handleFilterChange,
        handleLoadMore: filtersHook.handleLoadMore,
        resetFilters: filtersHook.resetFilters,
        hasActiveFilters: filtersHook.hasActiveFilters,
      }}
    />
  );
}

export default App;
