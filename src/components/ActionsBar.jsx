function ActionsBar({
  onLoadMore,
  hasMoreExpenses,
  hasExpenses,
  onClearSelected,
  onClearAll,
}) {
  let result;

  if (!hasExpenses) {
    result = <p className="empty-load-message">No expenses to load</p>;
  } else if (hasMoreExpenses) {
    result = (
      <button type="button" className="loadMore" onClick={onLoadMore}>
        Load more
      </button>
    );
  } else {
    result = <p className="empty-load-message">No more data exist</p>;
  }

  return (
    <section className="actions-bar">
      <div className="left">{result}</div>
      <div className="right">
        <button
          type="button"
          className="clearSelected"
          onClick={onClearSelected}
        >
          Clear selected
        </button>

        <button type="button" className="clearAll" onClick={onClearAll}>
          Clear all
        </button>
      </div>
    </section>
  );
}
export default ActionsBar;
