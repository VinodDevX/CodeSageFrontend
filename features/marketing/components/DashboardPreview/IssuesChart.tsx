"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";

interface Props {
  data: {
    day: string;
    issues: number;
    summary: {
      title: string;
      value: number;
    }[];
  }[];
}

export default function IssuesChart({ data }: Props) {
  return (
    <div className="chart-card">
      <h3>Issues Over Time</h3>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <XAxis dataKey="day" stroke="#888" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="issues"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.15}
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
