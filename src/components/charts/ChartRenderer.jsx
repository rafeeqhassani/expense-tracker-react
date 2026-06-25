import BarChartView from "./BarChartView";
import LineChartView from "./LineChartView";
import PieChartView from "./PieChartView";

const components = {
  bar: BarChartView,
  line: LineChartView,
  pie: PieChartView,
};

function ChartRenderer({ type, data }) {
  const Component = components[type];
  if (!Component) return null;
  return Component ? <Component data={data} /> : null;
}

export default ChartRenderer;
