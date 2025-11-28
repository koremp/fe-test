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
import { getChartColor } from "@/features/graph/lib/chartColors";

interface Props {
  data: CoffeeBrand[];
}

// 회사(브랜드) 기준 레전드 시리즈
const getCoffeeBrandSeries = (data: CoffeeBrand[]): LegendSeries[] =>
  data.map((d, i) => ({
    key: d.brand,
    label: d.brand,
    color: getChartColor(i), // 초기 색상(피커로 변경 가능)
  }));

export const CoffeeBrandsBarChart: React.FC<Props> = ({ data }) => {
  const series = getCoffeeBrandSeries(data);
  const { activeKeys, colors, renderLegend } = useLegendToggle(series);

  const activeData = data.filter((d) => activeKeys.includes(d.brand));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        ☕ 커피 브랜드 - 바 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={activeData}>
          <XAxis dataKey="brand" />
          <YAxis />
          <Tooltip />
          <Legend content={renderLegend()} />
          <Bar dataKey="popularity">
            {activeData.map((d) => (
              <Cell key={d.brand} fill={colors[d.brand]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CoffeeBrandsDonutChart: React.FC<Props> = ({ data }) => {
  const series = getCoffeeBrandSeries(data);
  const { activeKeys, colors, renderLegend } = useLegendToggle(series);

  const pieData = data
    .filter((d) => activeKeys.includes(d.brand))
    .map((d) => ({
      name: d.brand,
      value: d.popularity,
    }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        ☕ 커피 브랜드 - 도넛 차트
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
            {pieData.map((entry) => (
              <Cell key={entry.name} fill={colors[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={renderLegend()} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
