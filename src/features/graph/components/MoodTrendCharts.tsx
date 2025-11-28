// src/features/graph/components/MoodTrendCharts.tsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import type { MoodTrend } from "../types";
import { useLegendToggle } from "../hooks/useLegendToggle";

interface Props {
  data: MoodTrend[];
}

const SERIES = [
  { key: "happy", label: "행복", color: "#10b981" },
  { key: "tired", label: "피곤", color: "#f59e0b" },
  { key: "stressed", label: "스트레스", color: "#ef4444" },
];

export const MoodTrendStackedBar: React.FC<Props> = ({ data }) => {
  const { activeKeys, renderLegend } = useLegendToggle(SERIES);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        😊 기분 추이 - 스택 바 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="week" />
          <YAxis tickFormatter={(v) => `${v}`} />
          <Tooltip />
          <Legend content={renderLegend()} />
          {activeKeys.includes("happy") && (
            <Bar dataKey="happy" stackId="a" fill="#10b981" />
          )}
          {activeKeys.includes("tired") && (
            <Bar dataKey="tired" stackId="a" fill="#f59e0b" />
          )}
          {activeKeys.includes("stressed") && (
            <Bar dataKey="stressed" stackId="a" fill="#ef4444" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MoodTrendStackedArea: React.FC<Props> = ({ data }) => {
  const { activeKeys, renderLegend } = useLegendToggle(SERIES);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        😊 기분 추이 - 스택 면적 차트
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="week" />
          <YAxis tickFormatter={(v) => `${v}`} />
          <Tooltip />
          <Legend content={renderLegend()} />
          {activeKeys.includes("happy") && (
            <Area
              type="monotone"
              dataKey="happy"
              stackId="a"
              stroke="#10b981"
              fill="#10b981"
            />
          )}
          {activeKeys.includes("tired") && (
            <Area
              type="monotone"
              dataKey="tired"
              stackId="a"
              stroke="#f59e0b"
              fill="#f59e0b"
            />
          )}
          {activeKeys.includes("stressed") && (
            <Area
              type="monotone"
              dataKey="stressed"
              stackId="a"
              stroke="#ef4444"
              fill="#ef4444"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
