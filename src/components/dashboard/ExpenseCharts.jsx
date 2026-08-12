import { Link } from "react-router-dom";

import ChartRenderer from "../charts/ChartRenderer";

function ExpenseCharts({ charts = {} }) {
  const categoryData = (charts.category ?? []).map((item) => ({
    name: item.category,
    value: item.total,
  }));

  return (
    <div className="expense-charts">
      <section className="chart-section">
        <h3>Spending Trend</h3>
        <p>Monthly spending pattern</p>

        <ChartRenderer type="line" data={charts.monthly ?? []} />
      </section>

      <section className="chart-section">
        <h3>Spending by Category</h3>
        <p>See your biggest expense areas</p>

        <ChartRenderer type="pie" data={categoryData} />

        <Link to="/dashboard/categories" className="chart-link">
          View All Categories
        </Link>
      </section>
    </div>
  );
}

export default ExpenseCharts;
