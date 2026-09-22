"use client";

import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import "./PullRequests.css";

export default function PullRequests() {
  return (
    <main className="codesage-page">
      <AppSidebar active="pull-requests" />

      <section className="main-content">
        <AppHeader />

        <div className="page-label">
          <h1>Pull Requests</h1>
        </div>
      </section>
    </main>
  );
}
