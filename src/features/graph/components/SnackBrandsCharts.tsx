// src/features/graph/components/SnackBrandsCharts.tsx
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
import type { SnackBrand } from "../types";
import { useLegendToggle, type LegendSeries } from "../hooks/useLegendToggle";
import { getChartColor } from "../lib/chartColors";

interface Props {
  data: SnackBrand[];
}

// 회사(스낵 브랜드) 기준 레전드 시리즈
const getSnackBrandSeries = (data: SnackBrand[]): LegendSeries[] =>
  data.map((d, i) => ({
    key: d.name,
    label: d.name,
    color: getChartColor(i),
  }));

export const SnackBrandsBarChart: React.FC<Props> = ({ data }) => {
  const brandSeries = getSnackBrandSeries(data);
  const { activeKeys, renderLegend } = useLegendToggle(brandSeries);

  const activeData = data.filter((d) => activeKeys.includes(d.name));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🍫 스낵 브랜드 - 바 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={activeData}>
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip />
          <Legend content={renderLegend()} />
          <Bar dataKey="share">
            {activeData.map((_, i) => (
              <Cell key={i} fill={getChartColor(i)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SnackBrandsDonutChart: React.FC<Props> = ({ data }) => {
  const brandSeries = getSnackBrandSeries(data);
  const { activeKeys, renderLegend } = useLegendToggle(brandSeries);

  const pieData = data
    .filter((d) => activeKeys.includes(d.name))
    .map((d) => ({
      name: d.name,
      value: d.share,
    }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🍫 스낵 브랜드 - 도넛 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
          >
            {pieData.map((entry, i) => (
              <Cell key={entry.name} fill={getChartColor(i)} />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={renderLegend()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
