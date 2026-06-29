function SummaryCard({ label, value = 0, className = "" }) {
  return (
    <div className={`summary-card ${className}`}>
      <span>{label}</span>
      <h3>{value}</h3>
    </div>
  );
}

const summaryConfig = [
  { key: "totalAmount", label: "Total", className: "total" },
  { key: "totalRecords", label: "Records", className: "records" },
  { key: "highestExpense", label: "Highest", className: "highest" },
  { key: "lowestExpense", label: "Lowest", className: "lowest" },
  { key: "averageExpense", label: "Average", className: "average" },
];

function SummarySection({ title, data }) {
  return (
    <div className="summary-section">
      <h3 className="summary-title">{title}</h3>

      <div className="summary">
        {summaryConfig.map((item) => (
          <SummaryCard
            key={`${title}-${item.key}`}
            label={item.label}
            value={data?.[item.key]}
            className={item.className}
          />
        ))}
      </div>
    </div>
  );
}

function ExpenseAnalytics({ overall = {}, filtered = {} }) {
  return (
    <>
      <SummarySection title="Overall" data={overall} />
      <SummarySection title="This Month" data={filtered} />
    </>
  );
}

export default ExpenseAnalytics;
