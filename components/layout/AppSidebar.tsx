"use client";

import "@/features/dashboard/components/Dashboard.css";

import { useRouter } from "next/navigation";
import {
  Home,
  FolderGit2,
  Bot,
  GitPullRequest,
  CircleAlert,
  BarChart3,
  Settings,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import UpgradeCard from "@/components/layout/UpgradeCard";

type AppSidebarProps = {
  active:
    | "dashboard"
    | "repositories"
    | "ai-reviews"
    | "pull-requests"
    | "issues"
    | "analytics"
    | "settings";
};

export default function AppSidebar({ active }: AppSidebarProps) {
  const router = useRouter();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="Brand-logo">
          <img src="/mainlogo.png.png" alt="CodeSage AI" />
        </div>
      </div>

      <nav className="sidebar-nav">
        <SidebarItem
          icon={<Home size={19} />}
          label="Dashboard"
          active={active === "dashboard"}
          onClick={() => router.push("/dashboard")}
        />

        <SidebarItem
          icon={<FolderGit2 size={19} />}
          label="Repositories"
          active={active === "repositories"}
          onClick={() => router.push("/repositories")}
        />

        <SidebarItem
          icon={<Bot size={19} />}
          label="AI Reviews"
          active={active === "ai-reviews"}
          onClick={() => router.push("/ai-reviews")}
        />

        <SidebarItem
          icon={<GitPullRequest size={19} />}
          label="Pull Requests"
          active={active === "pull-requests"}
          onClick={() => router.push("/pull-requests")}
        />

        <SidebarItem
          icon={<CircleAlert size={19} />}
          label="Issues"
          active={active === "issues"}
          onClick={() => router.push("/issues")}
        />

        <SidebarItem
          icon={<BarChart3 size={19} />}
          label="Analytics"
          active={active === "analytics"}
          onClick={() => router.push("/analytics")}
        />

        <SidebarItem
          icon={<Settings size={19} />}
          label="Settings"
          active={active === "settings"}
          onClick={() => router.push("/settings")}
        />
      </nav>

      <div className="sidebar-footer">
        <UpgradeCard />

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

        <div className="user-profile">
          <div className="avatar">DJ</div>
          <ChevronRight size={18} />
        </div>
      </div>
    </aside>
  );
}

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
