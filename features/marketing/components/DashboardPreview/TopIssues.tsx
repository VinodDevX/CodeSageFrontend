"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface TopIssuesProps {
  data: {
    title: string;
    level: string;
  }[];

  stats: {
    title: string;
    value: number;
    unit: string;
    color: string;
    trend: string;
  }[];
}

export default function TopIssues({ data, stats }: TopIssuesProps) {
  return (
    <div className="top-issues-card">
      <div className="top-issues-header">
        <h3>Top Issues</h3>
      </div>

      <div className="issues-list">
        {data.map((issue, index) => (
          <div className="issue-item" key={index}>
            <div>
              <span className="issue-title">{issue.title}</span>

              {/* Stats value */}
              <div className="issue-count">
                {stats[index]?.value}
                {stats[index]?.unit}
              </div>
            </div>

            <span className={`issue-badge ${issue.level.toLowerCase()}`}>
              {issue.level}
            </span>
          </div>
        ))}
      </div>

      <button className="view-all-btn">
        View All Issues
        <ArrowForwardIosIcon sx={{ fontSize: 14, ml: 1 }} />
      </button>
    </div>
  );
}
