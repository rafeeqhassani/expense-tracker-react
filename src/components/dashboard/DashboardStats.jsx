import { formatCurrency } from "../../utils/expenseTransform";

const STATS_CONFIG = [
  {
    key: "expensesToday",
    label: "Expenses Today",
    type: "currency",
    className: "today",
  },
  {
    key: "expensesThisWeek",
    label: "This Week",
    type: "currency",
    className: "week",
  },
  {
    key: "expensesThisMonth",
    label: "This Month",
    type: "currency",
    className: "month",
  },
  {
    key: "expensesThisYear",
    label: "This Year",
    type: "currency",
    className: "year",
  },
  {
    key: "totalCategories",
    label: "Total Categories",
    type: "number",
    className: "categories",
  },
];

function DashboardStats({ data = {} }) {
  return (
    <section className="dashboard-stats">
      <h2>Dashboard Statistics</h2>

      <div className="summary">
        {STATS_CONFIG.map((item) => (
          <div className={`summary-card ${item.className}`} key={item.key}>
            <span>{item.label}</span>
            <h3>
              {item.type === "currency"
                ? formatCurrency(data[item.key] ?? 0)
                : (data[item.key] ?? 0)}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardStats;
