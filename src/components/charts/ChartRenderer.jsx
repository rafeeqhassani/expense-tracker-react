import BarChartView from "./BarChartView";
import LineChartView from "./LineChartView";
import PieChartView from "./PieChartView";

const CHART_COMPONENTS = {
  bar: BarChartView,
  line: LineChartView,
  pie: PieChartView,
};

function ChartRenderer({ type, data }) {
  const ChartComponent = CHART_COMPONENTS[type];

  if (!ChartComponent) return null;

  return <ChartComponent data={data} />;
}

export default ChartRenderer;
