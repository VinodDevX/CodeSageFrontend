"use client";

import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/redux/slices/authslice";
import type { AppDispatch, RootState } from "@/app/redux/store";
import { clearAuthStorage } from "@/lib/auth/tokenStorage";
import UpgradeCard from "@/components/layout/UpgradeCard";
import AppHeader from "@/components/layout/AppHeader";

import {
  Home,
  FolderGit2,
  Bot,
  GitPullRequest,
  CircleAlert,
  BarChart3,
  Settings,
  Upload,
  MoreHorizontal,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  Sparkles,
  Bug,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  Clock3,
  GitBranch,
  GitCommitHorizontal,
  CalendarDays,
  Code2,
  LogOut,
} from "lucide-react";

const SAMPLE_FILE = {
  name: "index.js",
  language: "JS",
  code: `import { useState, useEffect } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/users")
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      });
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        User Dashboard
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
`,
};

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isRawView, setIsRawView] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const lineCount = SAMPLE_FILE.code.split("\n").length;

  const handleLogout = () => {
    clearAuthStorage();
    dispatch(logout());
    router.replace("/login");
  };

  useEffect(() => {
    if (!copied) return undefined;

    const timeoutId = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  useEffect(() => {
    if (!isMaximized) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMaximized(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMaximized]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(SAMPLE_FILE.code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadCode = () => {
    const blob = new Blob([SAMPLE_FILE.code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = SAMPLE_FILE.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="codesage-page">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="brand">
          <div className="Brand-logo">
            <img
              src="/mainlogo.png.png"
              alt="CodeSage AI"
              style={{ width: "171px" }}
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          <SidebarItem icon={<Home size={19} />} label="Dashboard" active />

          <SidebarItem
            icon={<FolderGit2 size={19} />}
            label="Repositories"
            onClick={() => router.push("/repositories")}
          />

          <SidebarItem icon={<Bot size={19} />} label="AI Reviews" onClick={() => router.push("/ai-reviews")}/>

          <SidebarItem
            icon={<GitPullRequest size={19} />}
            label="Pull Requests"
            onClick={() => router.push("/pull-requests")}
          />

          <SidebarItem
            icon={<CircleAlert size={19} />}
            label="Issues"
            onClick={() => router.push("/issues")}
          />

          <SidebarItem
            icon={<BarChart3 size={19} />}
            label="Analytics"
            onClick={() => router.push("/analytics")}
          />

          <SidebarItem
            icon={<Settings size={19} />}
            label="Settings"
            onClick={() => router.push("/settings")}
          />
        </nav>

        <UpgradeCard />

        {/* Weekly Reviews */}
        <div className="weekly-reviews">
          <div className="weekly-header">
            <div className="weekly-icon">
              <Sparkles size={15} />
            </div>

            <span>Weekly Reviews</span>

            <strong>12 / 20</strong>
          </div>

          <div className="progress-track">
            <div className="progress-fill" />
          </div>
        </div>

        {/* User */}
        <div className="user-profile">
          <div className="avatar">DJ</div>
          <div className="user-info">
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
          <ChevronRight size={18} />
        </div>

        <button type="button" className="sidebar-item" onClick={handleLogout}>
          <LogOut size={19} />
          <span>Log out</span>
        </button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <section className="main-content">
        <AppHeader />

        {/* CONTENT */}
        <div className="dashboard-content">
          {/* ================= REVIEW HEADER ================= */}
          <section className="review-summary">
            <div>
              <div className="summary-title">
                <h1>Review Summary</h1>

                <span className="ai-badge">
                  <Sparkles size={12} />
                  AI Powered
                </span>
              </div>

              <p>AI has analyzed 245 lines of code in 2.4s</p>
            </div>

            <div className="summary-actions">
              <button className="completed-button">
                <CheckCircle2 size={16} />
                Review Completed
              </button>

              <button className="share-button">
                <Upload size={16} />
                Share Report
              </button>

              <button className="more-button">
                <MoreHorizontal size={19} />
              </button>
            </div>
          </section>

          {/* ================= REPOSITORY INFO ================= */}
          <section className="repository-info">
            <InfoItem
              icon={<GithubIcon />}
              label="Repository"
              value="codesage-web-app"
            />

            <div className="info-divider" />

            <InfoItem
              icon={<GitBranch size={16} />}
              label="Branch"
              value="feature/auth-improvements"
            />

            <div className="info-divider" />

            <InfoItem
              icon={<GitCommitHorizontal size={16} />}
              label="Commit"
              value="a1b2c3d"
            />

            <div className="info-divider" />

            <InfoItem
              icon={<CalendarDays size={16} />}
              label="Reviewed on"
              value="May 28, 2025 · 10:30 AM"
            />
          </section>

          {/* ================= CODE + RIGHT PANEL ================= */}
          <div className="dashboard-grid">
            {/* LEFT */}
            <div className="left-column">
              {/* CODE EDITOR */}
              {isMaximized ? (
                <button
                  type="button"
                  className="code-backdrop"
                  aria-label="Close expanded editor"
                  onClick={() => setIsMaximized(false)}
                />
              ) : null}

              <section
                className={`code-card ${isMaximized ? "is-maximized" : ""}`}
              >
                <div className="code-header">
                  <div className="file-name">
                    <span className="js-icon">{SAMPLE_FILE.language}</span>
                    {SAMPLE_FILE.name}
                  </div>

                  <div className="code-actions">
                    <button
                      type="button"
                      className={isRawView ? "is-active" : undefined}
                      aria-pressed={isRawView}
                      onClick={() => setIsRawView((current) => !current)}
                    >
                      {isRawView ? "Pretty" : "Raw"}
                    </button>
                    <button
                      type="button"
                      aria-label={copied ? "Copied" : "Copy file"}
                      title={copied ? "Copied" : "Copy"}
                      onClick={() => void handleCopyCode()}
                    >
                      {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                    <button
                      type="button"
                      aria-label="Download file"
                      title="Download"
                      onClick={handleDownloadCode}
                    >
                      <Download size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label={
                        isMaximized ? "Exit full screen" : "Expand editor"
                      }
                      title={isMaximized ? "Minimize" : "Expand"}
                      onClick={() => setIsMaximized((current) => !current)}
                    >
                      {isMaximized ? (
                        <Minimize2 size={16} />
                      ) : (
                        <Maximize2 size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="code-editor">
                  <div className="line-numbers">
                    {Array.from({ length: lineCount }, (_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>

                  {isRawView ? (
                    <pre>
                      <code>{SAMPLE_FILE.code}</code>
                    </pre>
                  ) : (
                  <pre>
                    <code>
                      <span className="keyword">import</span> {"{ "}
                      <span className="function">useState, useEffect</span>{" "}
                      {"}"} <span className="keyword">from</span>{" "}
                      <span className="string">{'"react"'}</span>
                      {";\n"}
                      <span className="keyword">import</span> axios{" "}
                      <span className="keyword">from</span>{" "}
                      <span className="string">{'"axios"'}</span>
                      {";\n\n"}
                      <span className="keyword">
                        export default function
                      </span>{" "}
                      <span className="function">UserDashboard</span>
                      {"() {\n"}
                      {"  "}
                      <span className="keyword">const</span> [users, setUsers] ={" "}
                      <span className="function">useState</span>
                      {"([]);\n"}
                      {"  "}
                      <span className="keyword">const</span> [loading,
                      setLoading] = <span className="function">useState</span>
                      {"(true);\n\n"}
                      {"  "}
                      <span className="function">useEffect</span>
                      {"(() =&gt; {\n"}
                      {"    "}
                      <span className="function">axios.get</span>
                      {"("}
                      <span className="string">{'"/api/users"'}</span>
                      {")\n"}
                      {"      ."}
                      <span className="function">then</span>
                      {"(res =&gt; {\n"}
                      {"        "}
                      <span className="function">setUsers</span>
                      {"(res.data);\n"}
                      {"        "}
                      <span className="function">setLoading</span>
                      {"(false);\n"}
                      {"      });\n"}
                      {"      ."}
                      <span className="function">catch</span>
                      {"(err =&gt; "}
                      <span className="function">console.error</span>
                      {"(err));\n"}
                      {"  }, []);\n\n"}
                      {"  "}
                      <span className="keyword">return</span> {"(\n"}
                      {"    "}
                      <span className="tag">&lt;div</span>{" "}
                      <span className="attribute">className</span>
                      {"="}
                      <span className="string">{'"p-6"'}</span>
                      <span className="tag">&gt;</span>
                      {"\n"}
                      {"      "}
                      <span className="tag">&lt;h2</span>{" "}
                      <span className="attribute">className</span>
                      {"="}
                      <span className="string">
                        {'"text-xl font-semibold mb-4"'}
                      </span>
                      <span className="tag">&gt;</span>
                      {"\n"}
                      {"        User Dashboard\n"}
                      {"      "}
                      <span className="tag">&lt;/h2&gt;</span>
                      {"\n"}
                      {"      "}
                      {"{loading ? (\n"}
                      {"        "}
                      <span className="tag">&lt;p&gt;</span>
                      {"Loading..."}
                      <span className="tag">&lt;/p&gt;</span>
                      {"\n"}
                      {"      ) : (\n"}
                      {"        "}
                      <span className="tag">&lt;ul&gt;</span>
                      {"\n"}
                      {"          {users.map(user =&gt; (\n"}
                      {"            "}
                      <span className="tag">&lt;li</span>{" "}
                      <span className="attribute">key</span>
                      {"={user.id}"}
                      <span className="tag">&gt;</span>
                      {"\n"}
                      {"              {user.name} - {user.email}\n"}
                      {"            "}
                      <span className="tag">&lt;/li&gt;</span>
                      {"\n"}
                      {"          ))}\n"}
                      {"        "}
                      <span className="tag">&lt;/ul&gt;</span>
                      {"\n"}
                      {"      )}\n"}
                      {"    "}
                      <span className="tag">&lt;/div&gt;</span>
                      {"\n"}
                      {"  );\n"}
                      {"}"}
                    </code>
                  </pre>
                  )}

                  {isRawView ? null : (
                  <div className="minimap">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  )}
                </div>
              </section>

              {/* ISSUES */}
              <section className="issues-card">
                <div className="issues-header">
                  <h2>
                    Issues Found <span>(6)</span>
                  </h2>

                  <div className="issue-tabs">
                    <button className="active">All</button>

                    <button>
                      Bugs <b>3</b>
                    </button>

                    <button>
                      Security <b>2</b>
                    </button>

                    <button>
                      Performance <b>1</b>
                    </button>

                    <button>
                      Best Practices <b>0</b>
                    </button>
                  </div>
                </div>

                <div className="issue-item">
                  <div className="issue-icon bug">
                    <Bug size={16} />
                  </div>

                  <div className="issue-content">
                    <div className="issue-title">
                      <strong>Uncaught error handling</strong>
                      <span>High</span>
                    </div>

                    <p>
                      Missing proper error handling for API request failure.
                    </p>
                  </div>

                  <div className="issue-location">
                    <code>index.js:14</code>
                    <ChevronRight size={17} />
                  </div>
                </div>
              </section>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <aside className="right-column">
              {/* SCORE */}
              <section className="score-card">
                <h2>
                  Overall Code Score
                  <span>ⓘ</span>
                </h2>

                <div className="score-main">
                  <div>
                    <strong>96</strong>
                    <span>/ 100</span>
                  </div>

                  <div className="score-ring">
                    <div className="score-ring-inner">
                      <span>A</span>
                    </div>
                  </div>
                </div>

                <h3>Excellent work!</h3>

                <p>Your code is clean, efficient and follows best practices.</p>

                <div className="score-progress">
                  <span />
                </div>
              </section>

              {/* BREAKDOWN */}
              <section className="breakdown-card">
                <h2>Score Breakdown</h2>

                <div className="metric-grid">
                  <Metric
                    icon={<Bug size={17} />}
                    title="Bugs"
                    value="3"
                    text="Issues found"
                    className="bug"
                  />

                  <Metric
                    icon={<ShieldCheck size={17} />}
                    title="Security"
                    value="2"
                    text="Issues found"
                    className="security"
                  />

                  <Metric
                    icon={<Zap size={17} />}
                    title="Performance"
                    value="1"
                    text="Improvement"
                    className="performance"
                  />

                  <Metric
                    icon={<CheckCircle2 size={17} />}
                    title="Best Practices"
                    value="12"
                    text="Good practices"
                    className="practices"
                  />
                </div>

                <button className="full-report">
                  View Full Report
                  <ArrowUpRight size={16} />
                </button>
              </section>

              {/* AI SUGGESTIONS */}
              <section className="suggestions-card">
                <div className="suggestions-title">
                  <Sparkles size={18} />
                  <h2>AI Suggestions</h2>
                </div>

                <Suggestion
                  icon={<Bug size={17} />}
                  title="Add error boundary"
                  text="Consider adding an error boundary to handle unexpected component errors."
                />

                <Suggestion
                  icon={<Zap size={17} />}
                  title="Optimize API calls"
                  text="Memoize API calls or use React Query for better state management."
                />

                <Suggestion
                  icon={<ShieldCheck size={17} />}
                  title="Use environment variables"
                  text="Store API endpoints in environment variables for better security."
                />

                <button className="all-suggestions">
                  View All Suggestions
                  <ArrowUpRight size={15} />
                </button>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`sidebar-item ${active ? "active" : ""}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="info-item">
      <div className="info-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Metric({
  icon,
  title,
  value,
  text,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  text: string;
  className: string;
}) {
  return (
    <div className={`metric ${className}`}>
      <div className="metric-top">
        <div className="metric-icon">{icon}</div>

        <span>{title}</span>
      </div>

      <strong>{value}</strong>

      <small>{text}</small>
    </div>
  );
}

function Suggestion({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="suggestion">
      <div className="suggestion-icon">{icon}</div>

      <div className="suggestion-content">
        <strong>{title}</strong>
        <p>{text}</p>
      </div>

      <ChevronRight size={17} />
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.69-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
