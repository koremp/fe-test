// src/features/graph/components/CoffeeConsumptionChart.tsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { CoffeeConsumption } from "../types";
import { useLegendToggle, type LegendSeries } from "../hooks/useLegendToggle";

interface Props {
  data: CoffeeConsumption[];
}

const SERIES: LegendSeries[] = [
  { key: "bugs", label: "Frontend 버그", color: "#10b981" },
  { key: "productivity", label: "Frontend 생산성", color: "#3b82f6" },
];

export const CoffeeConsumptionMultiLine: React.FC<Props> = ({ data }) => {
  const { activeKeys, colors, renderLegend } = useLegendToggle(SERIES);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        ☕ 커피 소비 멀티라인 차트
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cups" name="커피 잔수" />
          <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip />

          {/* 동적 Line 컴포넌트 - 토글 및 색상 반영 */}
          {activeKeys.includes("bugs") && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bugs"
              name="Frontend 버그"
              stroke={colors.bugs}
              strokeWidth={2}
              dot={{
                fill: colors.bugs,
                strokeWidth: 2,
              }}
            />
          )}

          {activeKeys.includes("productivity") && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="productivity"
              name="Frontend 생산성"
              stroke={colors.productivity}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                fill: colors.productivity,
                strokeWidth: 2,
                r: 4,
                symbol: "square",
              }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      {/* 커스텀 Legend - 토글 및 색상 변경 가능 */}
      {renderLegend()}
    </div>
  );
};
