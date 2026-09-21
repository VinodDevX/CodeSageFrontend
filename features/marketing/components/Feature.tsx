"use client";
import "./Feature.css";

import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const features = [
  {
    icon: <BugReportOutlinedIcon />,
    title: "Detect Issues",
    description:
      "Find bugs, vulnerabilities, and code smells before they go live.",
    color: "#a855f7",
  },
  {
    icon: <BoltOutlinedIcon />,
    title: "Improve Performance",
    description:
      "Get suggestions to optimize your code for better performance.",
    color: "#8b5cf6",
  },
  {
    icon: <SecurityOutlinedIcon />,
    title: "Follow Best Practices",
    description:
      "Ensure consistent, clean, and maintainable code across your team.",
    color: "#3b82f6",
  },
  {
    icon: <DescriptionOutlinedIcon />,
    title: "Actionable Reports",
    description:
      "Get detailed reports with clear explanations and recommended fixes.",
    color: "#a855f7",
  },
];

const Feature = () => {
  return (
    <section className="feature-section">
      <h2>Powerful AI. Smarter Code.</h2>

      <p className="feature-subtitle">
        CodeSage AI helps you ship high-quality code with confidence.
      </p>

      <div className="feature-grid">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div
              className="feature-icon"
              style={{
                color: item.color,
                borderColor: item.color,
              }}
            >
              {item.icon}
            </div>

            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
