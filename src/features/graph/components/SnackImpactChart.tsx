// src/features/graph/components/SnackImpactChart.tsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import type { SnackImpact } from "../types";
import { useLegendToggle } from "../hooks/useLegendToggle";

interface Props {
  data: SnackImpact[];
}

const SERIES = [
  { key: "Marketing-meetings", label: "Marketing 회의불참", color: "#10b981" },
  { key: "Marketing-morale", label: "Marketing 사기", color: "#10b981" },
  { key: "Sales-meetings", label: "Sales 회의불참", color: "#3b82f6" },
  { key: "Sales-morale", label: "Sales 사기", color: "#3b82f6" },
  { key: "HR-meetings", label: "HR 회의불참", color: "#f59e0b" },
  { key: "HR-morale", label: "HR 사기", color: "#f59e0b" },
];

export const SnackImpactMultiLine: React.FC<Props> = ({ data }) => {
  const { activeKeys, renderLegend } = useLegendToggle(SERIES);

  const getValue =
    (department: string, field: "meetingsMissed" | "morale") =>
    (d: SnackImpact) =>
      d.department === department ? d[field] : null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        🍪 스낵 영향도 멀티라인 차트
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="snacks" name="스낵 수" />
          <YAxis yAxisId="left" orientation="left" stroke="#ef4444" />
          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
          <Tooltip />
          <Legend content={renderLegend()} />
          {SERIES.map((s) => {
            if (!activeKeys.includes(s.key)) return null;
            const [dept, metric] = s.key.split("-");
            const isMeetings = metric === "meetings";
            const color = s.color;

            return (
              <Line
                key={s.key}
                yAxisId={isMeetings ? "left" : "right"}
                type="monotone"
                dataKey={getValue(
                  dept,
                  isMeetings ? "meetingsMissed" : "morale"
                )}
                name={s.label}
                stroke={color}
                strokeWidth={2}
                strokeDasharray={isMeetings ? undefined : "5 5"}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
