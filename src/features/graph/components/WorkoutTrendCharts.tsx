// src/features/graph/components/WorkoutTrendCharts.tsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";
import type { WorkoutTrend } from "../types";
import { useLegendToggle, type LegendSeries } from "../hooks/useLegendToggle";

interface Props {
  data: WorkoutTrend[];
}

const SERIES: LegendSeries[] = [
  { key: "running", label: "러닝", color: "#10b981" },
  { key: "cycling", label: "사이클", color: "#3b82f6" },
  { key: "stretching", label: "스트레칭", color: "#f59e0b" },
];

export const WorkoutTrendStackedBar: React.FC<Props> = ({ data }) => {
  const { activeKeys, colors, renderLegend } = useLegendToggle(SERIES);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🏃 운동 추이 - 스택 바 차트
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis tickFormatter={(v) => `${v}`} />
          <Tooltip formatter={(v: number) => `${v}`} />

          {activeKeys.includes("running") && (
            <Bar dataKey="running" stackId="a" fill={colors.running} />
          )}
          {activeKeys.includes("cycling") && (
            <Bar dataKey="cycling" stackId="a" fill={colors.cycling} />
          )}
          {activeKeys.includes("stretching") && (
            <Bar dataKey="stretching" stackId="a" fill={colors.stretching} />
          )}
        </BarChart>
      </ResponsiveContainer>

      {renderLegend()}
    </div>
  );
};

export const WorkoutTrendStackedArea: React.FC<Props> = ({ data }) => {
  const { activeKeys, colors, renderLegend } = useLegendToggle(SERIES);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🏃 운동 추이 - 스택 면적 차트
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="week" />
          <YAxis tickFormatter={(v) => `${v}`} />
          <Tooltip formatter={(v: number) => `${v}`} />

          {activeKeys.includes("running") && (
            <Area
              type="monotone"
              dataKey="running"
              stackId="a"
              stroke={colors.running}
              fill={colors.running}
              fillOpacity={0.8}
            />
          )}
          {activeKeys.includes("cycling") && (
            <Area
              type="monotone"
              dataKey="cycling"
              stackId="a"
              stroke={colors.cycling}
              fill={colors.cycling}
              fillOpacity={0.8}
            />
          )}
          {activeKeys.includes("stretching") && (
            <Area
              type="monotone"
              dataKey="stretching"
              stackId="a"
              stroke={colors.stretching}
              fill={colors.stretching}
              fillOpacity={0.8}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>

      {renderLegend()}
    </div>
  );
};
