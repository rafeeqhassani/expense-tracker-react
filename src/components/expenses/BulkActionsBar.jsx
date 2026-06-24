function BulkActionsBar({ selection, onClearSelected, selectedCount }) {
  const { allSelected, someSelected, handleDeselectAll, handleSelectAll } =
    selection;

  if (selectedCount === 0) return null;

  return (
    <div className="bulk-actions-wrapper">
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

      <div className="global-checkbox">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected;
            }}
            onChange={(e) => {
              e.target.checked ? handleSelectAll() : handleDeselectAll();
            }}
          />
          <span>Select All</span>
        </label>
      </div>
    </div>
  );
}

export default BulkActionsBar;
