import { formatCurrency } from "../../utils/expenseTransform";
const statsConfig = [
  {
    key: "expensesToday",
    label: "Expenses Today",
    type: "currency",
  },
  {
    key: "expensesThisWeek",
    label: "This Week",
    type: "currency",
  },
  {
    key: "expensesThisMonth",
    label: "This Month",
    type: "currency",
  },
  {
    key: "expensesThisYear",
    label: "This Year",
    type: "currency",
  },
  {
    key: "totalCategories",
    label: "Total Categories",
    type: "number",
  },
];

function DashboardStats({ data = {} }) {
  return (
    <section className="dashboard-stats">
      <h2>Dashboard Statistics</h2>

      <div className="stats-grid">
        {statsConfig.map((item) => (
          <div className="stat-card" key={item.key}>
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
