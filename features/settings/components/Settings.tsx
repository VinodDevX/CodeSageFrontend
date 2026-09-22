"use client";

import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import "./Settings.css";

export default function Settings() {
  return (
    <main className="codesage-page">
      <AppSidebar active="settings" />

      <section className="main-content">
        <AppHeader />

        <div className="page-label">
          <h1>Settings</h1>
        </div>
      </section>
    </main>
  );
}
