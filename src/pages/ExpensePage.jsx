import useAppContext from "../providers/useAppContext";

import Filters from "../components/expenses/Filters";
import ExpenseList from "../components/expenses/ExpenseList";
import BulkActionsBar from "../components/expenses/BulkActionsBar";
import GeneralActionsBar from "../components/expenses/GeneralActionsBar";

import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function ExpensePage() {
  const { expense, filters, actions } = useAppContext();

  const { expenses, pagination, loadingMore } = expense;

  if (expense.loading && expenses.length === 0) {
    return <LoadingState message="Loading expenses..." />;
  }

  if (expense.error) {
    return (
      <ErrorState message={expense.error} onRetry={actions.loadExpenses} />
    );
  }

  return (
    <>
      <section className="expense-page">
        <header className="expense-page-header">
          <h2>Manage your expenses</h2>
          <p>Review, filter, and manage your expenses.</p>
        </header>

        <section className="expense-content">
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
            expenses={expenses}
            searchQuery={filters?.search || ""}
            onDelete={actions.handleDeleteExpense}
            onEdit={actions.handleEditExpense}
          />

          <GeneralActionsBar
            onLoadMore={actions.loadMoreExpenses}
            pagination={expense.pagination}
            loadingMore={expense.loadingMore}
            onClearAll={actions.handleClearAll}
            hasActiveFilters={actions.hasActiveFilters}
          />
        </section>
      </section>
    </>
  );
}

export default ExpensePage;
