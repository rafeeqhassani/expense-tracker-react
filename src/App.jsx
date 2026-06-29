import useExpenses from "./hooks/useExpenses";
import useFilters from "./hooks/useFilters";
import useExpenseForm from "./hooks/useExpenseForm";
import useToast from "./hooks/useToast";

import MainLayout from "./components/layout/MainLayout";

import useAnalytics from "./hooks/useAnalytics";
import useBudget from "./hooks/useBudget";
import useBudgetConfig from "./hooks/useBudgetConfig";

function App() {
  const { toast, showToastMessage } = useToast();

  const expensesHook = useExpenses(showToastMessage);

  const filtersHook = useFilters(expensesHook.expenses);

  const formHook = useExpenseForm({
    expenses: expensesHook.expenses,
    handleAddExpense: expensesHook.handleAddExpense,
    handleUpdateExpense: expensesHook.handleUpdateExpense,
    showToastMessage,
  });

  const reportsHook = useAnalytics(
    expensesHook.expenses,
    filtersHook.processedExpenses,
  );

  const budgetConfigHook = useBudgetConfig();
  const budgetHook = useBudget(
    expensesHook.expenses,
    budgetConfigHook.budgetConfig,
  );

  const handleClearAllData = () => {
    expensesHook.handleClearAll();
    budgetConfigHook.resetBudgetConfig();
    showToastMessage("All data cleared", "success");
  };

  return (
    <MainLayout
      data={{
        visibleExpenses: filtersHook.limitedExpenses,
        processedExpenses: filtersHook.processedExpenses,
        visibleCount: filtersHook.visibleCount,
        categories: filtersHook.categories,
        filters: filtersHook.filters,
      }}
      analytics={reportsHook}
      budget={budgetHook}
      budgetConfig={budgetConfigHook.budgetConfig}
      updateMonthlyLimit={budgetConfigHook.updateMonthlyLimit}
      updateCategoryLimit={budgetConfigHook.updateCategoryLimit}
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
        handleClearAll: handleClearAllData,

        handleFilterChange: filtersHook.handleFilterChange,
        handleLoadMore: filtersHook.handleLoadMore,
        resetFilters: filtersHook.resetFilters,
        hasActiveFilters: filtersHook.hasActiveFilters,
      }}
    />
  );
}

export default App;
