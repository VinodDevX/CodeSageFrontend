"use client";

import "@/features/dashboard/components/Dashboard.css";
import "./Repository.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Home,
  FolderGit2,
  Bot,
  GitPullRequest,
  CircleAlert,
  BarChart3,
  Settings,
  ChevronRight,
  Sparkles,
  LockKeyhole,
  ArrowRight,
  X,
  GitBranch,
  Clock3,
  Code2,
  Trash2,
  Eye,
  FileSearch,
  Lightbulb,
} from "lucide-react";

type RepositoryType = {
  id: number;
  name: string;
  owner: string;
  language: string;
  branch: string;
  visibility: string;
  updatedAt: string;
};

const availableRepositories: RepositoryType[] = [
  { id: 1, name: "CodeSage-Frontend", owner: "DeshnaJain", language: "TypeScript", branch: "main", visibility: "Private", updatedAt: "2 hours ago" },
  { id: 2, name: "AI-Code-Review", owner: "DeshnaJain", language: "JavaScript", branch: "main", visibility: "Private", updatedAt: "5 hours ago" },
  { id: 3, name: "Developer-Dashboard", owner: "DeshnaJain", language: "React", branch: "develop", visibility: "Public", updatedAt: "Yesterday" },
  { id: 4, name: "Portfolio-Website", owner: "DeshnaJain", language: "Next.js", branch: "main", visibility: "Public", updatedAt: "2 days ago" },
];

export default function Repository() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importedRepositories, setImportedRepositories] = useState<
    RepositoryType[]
  >([]);

  const handleImportRepository = (repository: RepositoryType) => {
    setImportedRepositories((current) =>
      current.some((repo) => repo.id === repository.id)
        ? current
        : [...current, repository],
    );
    setIsModalOpen(false);
  };

  const handleDeleteRepository = (id: number) => {
    setImportedRepositories((current) =>
      current.filter((repository) => repository.id !== id),
    );
  };

  return (
    <main className="codesage-page">
      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">
        {/* LOGO */}

        <div className="brand">
          <div className="Brand-logo" style={{ height: "86px" }}>
            <img
              src="/mainlogo.png.png"
              alt="CodeSage AI"
              style={{ width: "171px", height: "110px" }}
            />
          </div>
        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-nav">
          <SidebarItem
            icon={<Home size={19} />}
            label="Dashboard"
            onClick={() => router.push("/dashboard")}
          />

          <SidebarItem
            icon={<FolderGit2 size={19} />}
            label="Repositories"
            active
          />

          <SidebarItem icon={<Bot size={19} />} label="AI Reviews" />

          <SidebarItem
            icon={<GitPullRequest size={19} />}
            label="Pull Requests"
          />

          <SidebarItem icon={<CircleAlert size={19} />} label="Issues" />

          <SidebarItem icon={<BarChart3 size={19} />} label="Analytics" />

          <SidebarItem icon={<Settings size={19} />} label="Settings" />
        </nav>

        {/* ================= UPGRADE CARD ================= */}

        <div className="upgrade-card">
          <div className="upgrade-icon">
            <Sparkles size={19} />
          </div>

          <h3>Upgrade to Pro</h3>

          <p>Unlock advanced AI models, team insights and unlimited reviews.</p>

          <button className="upgrade-button">Upgrade Now</button>
        </div>

        {/* ================= WEEKLY REVIEWS ================= */}

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

        {/* ================= USER ================= */}

        <div className="user-profile">
          <div className="avatar">DJ</div>

          {/* <div className="user-info">
            <strong>Deshna  guub</strong>

            <span>Frontend Developer</span>
          </div> */}

          <ChevronRight size={18} />
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <section className="main-content eymain">
        {/* PAGE HEADER */}

        <div className="repository-topbar">
          <div>
            <p className="repository-eyebrow">GITHUB WORKSPACE</p>

            <span style={{ paddingLeft: "20px" }}>
              Import a repository and start reviewing your code with Codesage
              AI.
            </span>
          </div>
        </div>
        {/* ================= IMPORTED REPOSITORIES ================= */}

        {importedRepositories.length > 0 ? (
          <div className="imported-repositories-container">
            <div className="imported-header">
              <div>
                <p className="repository-eyebrow">YOUR REPOSITORIES</p>

                <h2>Imported Repositories</h2>

                <span>
                  Manage your imported repositories and start analyzing your
                  code.
                </span>
              </div>

              <button
                className="add-repository-button"
                onClick={() => setIsModalOpen(true)}
              >
                <GithubIcon />
                <span>Import Repository</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* ================= REPOSITORY LIST ================= */}

            <div className="repository-list">
              {importedRepositories.map((repo) => (
                <div className="repository-row" key={repo.id}>
                  {/* REPOSITORY INFO */}

                  <div className="repository-point">
                    <span className="repository-bullet">•</span>

                    <div className="repository-info">
                      <strong>{repo.name}</strong>

                      <span>
                        {repo.owner} / {repo.name}
                      </span>
                    </div>
                  </div>

                  {/* REPOSITORY DETAILS */}

                  <div className="repository-meta">
                    <span>
                      <Code2 size={14} />
                      {repo.language}
                    </span>

                    <span>
                      <GitBranch size={14} />
                      {repo.branch}
                    </span>

                    <span>
                      <Clock3 size={14} />
                      {repo.updatedAt}
                    </span>
                  </div>

                  {/* ================= ACTION BUTTONS ================= */}

                  <div className="repository-actions">
                    <button type="button" className="repository-action-button">
                      <CircleAlert size={15} />
                      <span>Issues</span>
                    </button>

                    <button type="button" className="repository-action-button">
                      <FileSearch size={15} />
                      <span>Reviews</span>
                    </button>

                    <button type="button" className="repository-action-button">
                      <Lightbulb size={15} />
                      <span>Insights</span>
                    </button>

                    <button
                      type="button"
                      className="repository-action-button delete-action"
                      onClick={() => handleDeleteRepository(repo.id)}
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */

          <div className="repository-empty-state">
            {/* CODE ICON */}

            <div className="repository-illustration">
              <div className="repository-glow" />

              <div className="repository-code-icon">
                <span>&lt;/&gt;</span>
              </div>

              <div className="spark spark-one">✦</div>

              <div className="spark spark-two">✦</div>

              <div className="spark spark-three">✦</div>
            </div>

            {/* TITLE */}

            <h2>
              Welcome to <span>Codesage</span>
            </h2>

            {/* DESCRIPTION */}

            <p>
              Import a GitHub repository to start AI-powered code reviews,
              <br />
              detect issues, and improve code quality.
            </p>

            {/* IMPORT BUTTON */}

            <button
              className="import-repository-button"
              onClick={() => setIsModalOpen(true)}
            >
              <GithubIcon />

              <span>Import Repository</span>

              <ArrowRight size={17} />
            </button>

            {/* SECURITY */}

            <div className="repository-security">
              <div>
                <LockKeyhole size={16} />
                Secure
              </div>

              <span>•</span>

              <div>Private</div>

              <span>•</span>

              <div>Read-only</div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================
          IMPORT REPOSITORY MODAL
      ====================================================== */}

      {isModalOpen && (
        <div
          className="repository-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="repository-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}

            <div className="repository-modal-header">
              <div>
                <p className="repository-eyebrow">GITHUB</p>

                <h2>Import Repository</h2>

                <span>Select a repository to add it to CodeSage.</span>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={19} />
              </button>
            </div>

            {/* REPOSITORY OPTIONS */}

            <div className="modal-repository-list">
              {availableRepositories.map((repo) => (
                <div className="modal-repository-item" key={repo.id}>
                  {/* REPOSITORY */}

                  <div className="modal-repository-info">
                    <div className="modal-repository-icon">
                      <GithubIcon />
                    </div>

                    <div>
                      <strong>{repo.name}</strong>

                      <span>
                        {repo.owner} / {repo.name}
                      </span>
                    </div>
                  </div>

                  {/* DETAILS */}

                  <div className="modal-repository-details">
                    <span>{repo.language}</span>

                    <span>{repo.visibility}</span>
                  </div>

                  {/* INDIVIDUAL IMPORT BUTTON */}

                  <button
                    type="button"
                    className="modal-import-button"
                    onClick={() => handleImportRepository(repo)}
                  >
                    <span>Import</span>

                    <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* MODAL FOOTER */}

            <div className="repository-modal-footer">
              <LockKeyhole size={15} />

              <span>Repositories are imported in read-only mode.</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================================================
   SIDEBAR ITEM
========================================================= */

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

/* =========================================================
   GITHUB ICON
========================================================= */

function GithubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.69-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}
