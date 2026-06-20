function BulkActionsBar({ onClearSelected, selectedCount }) {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-action">
      <span className="selected-count">{selectedCount} selected</span>

      <button
        type="button"
        className="clear-selected"
        onClick={onClearSelected}
      >
        Clear Selected
      </button>
    </div>
  );
}

export default BulkActionsBar;
