"use client";

import "./DashboardPreview.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import MergeTypeOutlinedIcon from "@mui/icons-material/MergeTypeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import StatCard from "./StatCard";
import IssuesChart from "./IssuesChart";
import TopIssues from "./TopIssues";
import { stats, issueHistory, topIssues } from "./dashboardPreviewData";

const menuItems = [
  {
    icon: <DashboardIcon />,
    title: "Overview",
    active: true,
  },
  {
    icon: <BugReportOutlinedIcon />,
    title: "Issues",
    active: false,
  },
  {
    icon: <MergeTypeOutlinedIcon />,
    title: "Pull Requests",
    active: false,
  },
  {
    icon: <DescriptionOutlinedIcon />,
    title: "Reports",
    active: false,
  },
  {
    icon: <SettingsOutlinedIcon />,
    title: "Settings",
    active: false,
  },
];

export default function Landingpage() {
  return (
    <section className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-circle" />
          <h2>CodeSage</h2>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.title}
              className={`menu-item ${item.active ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
        </nav>

        <KeyboardArrowRightIcon />
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>All Insights. One Dashboard.</h1>
          <p>
            Get a complete overview of your repository health with AI-powered
            insights.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="stats-grid">
          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              unit={item.unit}
              color={item.color}
              trend={item.trend}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <div className="dashboard-bottom">
          <div className="chart-section">
            <IssuesChart data={issueHistory} />
          </div>
          <div className="issues-section">
            <TopIssues data={topIssues} stats={stats} />
          </div>
        </div>
      </main>
    </section>
  );
}
