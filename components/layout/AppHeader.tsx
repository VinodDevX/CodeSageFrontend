"use client";

import { useSelector } from "react-redux";
import { Bell, HelpCircle, Menu, Moon, Search, Sun } from "lucide-react";
import type { RootState } from "@/app/redux/store";
import { useTheme } from "@/features/theme/ThemeProvider";
import "@/features/dashboard/components/Dashboard.css";

function getInitials(name?: string | null) {
  if (!name?.trim()) return "DJ";

  const parts = name.trim().split(/\s+/);

  return (
    parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "DJ"
  );
}

export default function AppHeader() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <button type="button" className="menu-button" aria-label="Open menu">
        <Menu size={21} />
      </button>

      <div className="search-box">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search repositories, files, reviews..."
        />

        <span className="search-shortcut">⌘ K</span>
      </div>

      <div className="top-actions">
        <button type="button" className="top-icon" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <button type="button" className="top-icon" aria-label="Help">
          <HelpCircle size={20} />
        </button>

        <button
          type="button"
          className="top-icon"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="top-avatar">
          {getInitials(user?.name)}
          <span />
        </div>
      </div>
    </header>
  );
}
