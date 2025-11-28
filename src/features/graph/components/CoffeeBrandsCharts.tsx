// src/features/graph/components/CoffeeBrandsCharts.tsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { CoffeeBrand } from "../types";
import { useLegendToggle, type LegendSeries } from "../hooks/useLegendToggle";

interface Props {
  data: CoffeeBrand[];
}

const BAR_SERIES: LegendSeries[] = [
  { key: "popularity", label: "인기도", color: "#10b981" },
];

export const CoffeeBrandsBarChart: React.FC<Props> = ({ data }) => {
  const { activeKeys, renderLegend } = useLegendToggle(BAR_SERIES);
  const active = activeKeys.includes("popularity");

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        ☕ 커피 브랜드 - 바 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="brand" />
          <YAxis />
          <Tooltip />
          <Legend content={renderLegend()} />
          {active && <Bar dataKey="popularity" fill="#10b981" />}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const DONUT_SERIES: LegendSeries[] = [
  { key: "popularity", label: "인기도", color: "#10b981" },
];

export const CoffeeBrandsDonutChart: React.FC<Props> = ({ data }) => {
  const { activeKeys, renderLegend } = useLegendToggle(DONUT_SERIES);
  const active = activeKeys.includes("popularity");
  const pieData = data.map((d) => ({ name: d.brand, value: d.popularity }));
  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        ☕ 커피 브랜드 - 도넛 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          {active && (
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          )}
          <Tooltip />
          <Legend content={renderLegend()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
