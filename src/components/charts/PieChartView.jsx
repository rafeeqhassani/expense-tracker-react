import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { chartColors } from "../../utils/chartsColors";

function PieChartView({ data }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={chartColors.pie[index % chartColors.pie.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartView;
