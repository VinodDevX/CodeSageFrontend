"use client";

import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import "./Issues.css";

export default function Issues() {
  return (
    <main className="codesage-page">
      <AppSidebar active="issues" />

      <section className="main-content">
        <AppHeader />

        <div className="page-label">
          <h1>Issues</h1>
        </div>
      </section>
    </main>
  );
}
