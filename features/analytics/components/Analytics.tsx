"use client";

import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import "./Analytics.css";

export default function Analytics() {
  return (
    <main className="codesage-page">
      <AppSidebar active="analytics" />

      <section className="main-content">
        <AppHeader />

        <div className="page-label">
          <h1>Analytics</h1>
        </div>
      </section>
    </main>
  );
}
