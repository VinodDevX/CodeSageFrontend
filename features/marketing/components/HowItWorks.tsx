import "./HowItWorks.css";

import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="section-title">
        <h2>How CodeSage AI Works</h2>
        <p>From code to insights in just a few simple steps.</p>
      </div>

      <div className="steps-container">
        <div className="step">
          <div className="icon-box">
            <AccountTreeOutlinedIcon sx={{ fontSize: 38 }} />
          </div>

          <h3>Connect Repository</h3>

          <p>Connect your GitHub, GitLab, or Bitbucket repository.</p>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="icon-box">
            <AutoAwesomeOutlinedIcon sx={{ fontSize: 38 }} />
          </div>

          <h3>AI Analyzes Code</h3>

          <p>
            Our AI scans and analyzes your code for issues, patterns, and
            improvements.
          </p>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="icon-box">
            <AnalyticsOutlinedIcon sx={{ fontSize: 38 }} />
          </div>

          <h3>Get Insights</h3>

          <p>
            Receive actionable insights and suggestions to improve your code.
          </p>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="icon-box blue">
            <RocketLaunchOutlinedIcon sx={{ fontSize: 38 }} />
          </div>

          <h3>Ship Better Code</h3>

          <p>Apply fixes, follow best practices, and ship high-quality code.</p>
        </div>
      </div>
    </section>
  );
}
