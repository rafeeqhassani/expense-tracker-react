import useAppContext from "../providers/useAppContext";

import Filters from "../components/expenses/Filters";
import ExpenseList from "../components/expenses/ExpenseList";
import BulkActionsBar from "../components/expenses/BulkActionsBar";
import GeneralActionsBar from "../components/expenses/GeneralActionsBar";

function ExpensePage() {
  const { data, actions } = useAppContext();

  const {
    displayedExpenses,
    processedExpenses,
    pagination,
    loadingMore,
    loadMoreExpenses,
    filters,
  } = data;

  return (
    <>
      <Filters
        filters={filters}
        handleFilterChange={actions.handleFilterChange}
        hasActiveFilters={actions.hasActiveFilters}
        resetFilters={actions.resetFilters}
      />

      <BulkActionsBar
        onClearSelected={actions.handleRemoveSelected}
        selectedCount={actions.selectedCount}
        selection={{
          allSelected: actions.allSelected,
          someSelected: actions.someSelected,
          handleSelectAll: actions.handleSelectAll,
          handleDeselectAll: actions.handleDeselectAll,
        }}
      />

      {actions.lastDeletedExpense && (
        <div className="undo-bar">
          <span>Expense deleted</span>
          <button onClick={actions.handleUndoDelete}>Undo</button>
        </div>
      )}

      <ExpenseList
        expenses={displayedExpenses}
        searchQuery={filters?.title || ""}
        onDelete={actions.handleDeleteExpense}
        onEdit={actions.handleEditExpense}
      />

      <GeneralActionsBar
        onLoadMore={data.loadMoreExpenses}
        pagination={data.pagination}
        loadingMore={data.loadingMore}
        processedExpenses={processedExpenses}
        onClearAll={actions.handleClearAll}
        hasActiveFilters={actions.hasActiveFilters}
      />
    </>
  );
}

export default ExpensePage;
