import { useState } from "react";
import { getChartData } from "../../utils/expenseTransform";
import ChartRenderer from "./ChartRenderer";
function ExpenseCharts({ expenses }) {
  const [chartType, setChartType] = useState("bar");

  const chartData = getChartData(chartType, expenses);

  return (
    <section className="charts-section">
      <div className="chart-controls">
        <button onClick={() => setChartType("bar")}>Bar</button>
        <button onClick={() => setChartType("line")}>Line</button>
        <button onClick={() => setChartType("pie")}>Pie</button>
      </div>
      <div className="chart-content">
        <ChartRenderer type={chartType} data={chartData} />
      </div>
    </section>
  );
}

export default ExpenseCharts;
