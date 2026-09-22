"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AppSidebar from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import "./AiReviews.css";

import {
  ArrowRight,
  Blend,
  Bot,
  Bug,
  CheckCircle2,
  Clock3,
  FileSearch,
  FolderGit2,
  GitBranch,
  GitCommitHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  X,
  Zap,
} from "lucide-react";

import {
  authorshipForLikeness,
  authorshipLabel,
  fileForLanguage,
  gradeForScore,
  initialReviews,
  reviewRepositories,
  reviewTypes,
  type AiReview,
  type Authorship,
  type ReviewRepository,
  type ReviewStatus,
  type ReviewType,
} from "./aiReviewsData";

const WEEKLY_LIMIT = 20;
const INITIAL_QUOTA = 12;

export default function AiReviews() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<AiReview[]>(initialReviews);
  const [quotaUsed, setQuotaUsed] = useState(INITIAL_QUOTA);
  const [statusFilter, setStatusFilter] = useState<"all" | ReviewStatus>("all");
  const [repoFilter, setRepoFilter] = useState(
    () => searchParams.get("repo") ?? "all",
  );
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<ReviewRepository | null>(
    null,
  );
  const [selectedTypes, setSelectedTypes] = useState<ReviewType[]>([
    "bugs",
    "security",
    "performance",
    "practices",
    "authorship",
  ]);
  const completionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (completionTimer.current !== null) {
        clearTimeout(completionTimer.current);
      }
    };
  }, []);

  const repoOptions = useMemo(() => {
    const names = new Set(reviewRepositories.map((repo) => repo.name));
    reviews.forEach((review) => names.add(review.repo));
    return ["all", ...Array.from(names)];
  }, [reviews]);

  const filteredReviews = reviews.filter((review) => {
    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    const matchesRepo = repoFilter === "all" || review.repo === repoFilter;
    const haystack =
      `${review.repo} ${review.file} ${review.commit} ${review.branch}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase().trim());

    return matchesStatus && matchesRepo && matchesQuery;
  });

  const completedReviews = reviews.filter(
    (review) => review.status === "completed" && review.score !== null,
  );
  const averageScore =
    completedReviews.length === 0
      ? 0
      : Math.round(
          completedReviews.reduce(
            (total, review) => total + (review.score ?? 0),
            0,
          ) / completedReviews.length,
        );
  const highSeverityCount = reviews.reduce(
    (total, review) => total + review.highSeverity,
    0,
  );
  const humanWrittenCount = reviews.filter(
    (review) => review.authorship === "human",
  ).length;

  const canStartReview =
    selectedRepo !== null &&
    selectedTypes.length > 0 &&
    quotaUsed < WEEKLY_LIMIT;

  const resetModal = () => {
    setSelectedRepo(null);
    setSelectedTypes([
      "bugs",
      "security",
      "performance",
      "practices",
      "authorship",
    ]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetModal();
  };

  const toggleReviewType = (type: ReviewType) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
  };

  const handleStartReview = () => {
    if (!selectedRepo || !canStartReview) return;

    const reviewId = Date.now();
    const newReview: AiReview = {
      id: reviewId,
      repo: selectedRepo.name,
      owner: selectedRepo.owner,
      branch: selectedRepo.branch,
      commit: Math.random().toString(16).slice(2, 9),
      file: fileForLanguage(selectedRepo.language),
      lines: 160 + Math.floor(Math.random() * 220),
      duration: "Analyzing...",
      score: null,
      grade: null,
      bugs: 0,
      security: 0,
      performance: 0,
      bestPractices: 0,
      highSeverity: 0,
      authorship: null,
      humanLikeness: null,
      status: "in-progress",
      reviewedAt: "Just now",
    };

    setReviews((current) => [newReview, ...current]);
    setQuotaUsed((current) => current + 1);
    setStatusFilter("all");
    setRepoFilter("all");
    setQuery("");
    closeModal();

    if (completionTimer.current !== null) {
      clearTimeout(completionTimer.current);
    }

    completionTimer.current = setTimeout(() => {
      const score = 84 + Math.floor(Math.random() * 13);
      const bugs = selectedTypes.includes("bugs") ? 2 : 0;
      const security = selectedTypes.includes("security") ? 1 : 0;
      const performance = selectedTypes.includes("performance") ? 1 : 0;
      const bestPractices = selectedTypes.includes("practices") ? 8 : 0;
      const humanLikeness = selectedTypes.includes("authorship")
        ? Math.min(98, Math.max(22, score - 18 + Math.floor(Math.random() * 28)))
        : null;
      const authorship =
        humanLikeness === null ? null : authorshipForLikeness(humanLikeness);

      setReviews((current) =>
        current.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                status: "completed",
                duration: "2.1s",
                score,
                grade: gradeForScore(score),
                bugs,
                security,
                performance,
                bestPractices,
                highSeverity: security,
                authorship,
                humanLikeness,
                reviewedAt: "Just now",
              }
            : review,
        ),
      );
    }, 1800);
  };

  const statusCounts = {
    all: reviews.length,
    completed: reviews.filter((review) => review.status === "completed").length,
    "in-progress": reviews.filter((review) => review.status === "in-progress")
      .length,
    failed: reviews.filter((review) => review.status === "failed").length,
  };

  return (
    <main className="codesage-page">
      <AppSidebar active="ai-reviews" />

      <section className="main-content">
        <AppHeader />

        <div className="reviews-main">
        <header className="reviews-header">
          <div>
            <p className="reviews-eyebrow">AI REVIEWS</p>
            <h1>Review Workspace</h1>
            <p>
              Run AI analysis on your repositories and open past reports.
            </p>
          </div>

          <div className="reviews-header-actions">
            <div className="reviews-quota">
              <Sparkles size={14} />
              <span>
                {quotaUsed} / {WEEKLY_LIMIT} this week
              </span>
            </div>

            <button
              type="button"
              className="reviews-primary-button"
              onClick={() => setIsModalOpen(true)}
            >
              <Sparkles size={16} />
              <span>New Review</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </header>

        <div className="reviews-stats">
          <StatCard label="Reviews this week" value={String(quotaUsed)} />
          <StatCard label="Average score" value={`${averageScore}`} hint="/100" />
          <StatCard
            label="High-severity findings"
            value={String(highSeverityCount)}
          />
          <StatCard
            label="Human-written"
            value={String(humanWrittenCount)}
            hint={`/${completedReviews.length || 0}`}
          />
        </div>

        <div className="reviews-toolbar">
          <div className="reviews-tabs">
            {(
              [
                ["all", "All"],
                ["in-progress", "In progress"],
                ["completed", "Completed"],
                ["failed", "Failed"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={statusFilter === value ? "active" : ""}
                onClick={() => setStatusFilter(value)}
              >
                {label}
                <b>{statusCounts[value]}</b>
              </button>
            ))}
          </div>

          <div className="reviews-toolbar-filters">
            <label className="reviews-select-wrap">
              <FolderGit2 size={14} />
              <select
                value={repoFilter}
                onChange={(event) => setRepoFilter(event.target.value)}
              >
                {repoOptions.map((repo) => (
                  <option key={repo} value={repo}>
                    {repo === "all" ? "All repositories" : repo}
                  </option>
                ))}
              </select>
            </label>

            <label className="reviews-search">
              <Search size={15} />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search repo, file, or commit"
              />
            </label>
          </div>
        </div>

        {filteredReviews.length > 0 ? (
          <div className="reviews-list">
            {filteredReviews.map((review) => (
              <article className="reviews-card" key={review.id}>
                <div className={`reviews-score ${review.status}`}>
                  {review.score !== null ? (
                    <>
                      <strong>{review.score}</strong>
                      <span>{review.grade}</span>
                    </>
                  ) : (
                    <span className="reviews-score-empty">
                      {review.status === "in-progress" ? "…" : "—"}
                    </span>
                  )}
                </div>

                <div className="reviews-card-body">
                  <div className="reviews-card-title">
                    <strong>{review.repo}</strong>
                    <StatusBadge status={review.status} />
                    <AuthorshipBadge authorship={review.authorship} />
                  </div>

                  <div className="reviews-card-meta">
                    <span>
                      <GitBranch size={13} />
                      {review.branch}
                    </span>
                    <span>
                      <GitCommitHorizontal size={13} />
                      {review.commit}
                    </span>
                    <span>
                      <FileSearch size={13} />
                      {review.file} · {review.lines} lines
                    </span>
                    <span>
                      <Clock3 size={13} />
                      {review.duration}
                    </span>
                  </div>

                  {review.status === "completed" ? (
                    <div className="reviews-issue-chips">
                      <span>
                        <Bug size={12} />
                        Bugs {review.bugs}
                      </span>
                      <span>
                        <ShieldCheck size={12} />
                        Security {review.security}
                      </span>
                      <span>
                        <Zap size={12} />
                        Performance {review.performance}
                      </span>
                      <span>
                        <CheckCircle2 size={12} />
                        Practices {review.bestPractices}
                      </span>
                      {review.authorship ? (
                        <span className={`reviews-authorship-chip ${review.authorship}`}>
                          <AuthorshipIcon authorship={review.authorship} />
                          {authorshipLabel(review.authorship)}
                          {review.humanLikeness !== null
                            ? ` · ${review.humanLikeness}% human`
                            : null}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <p className="reviews-card-note">
                      {review.status === "in-progress"
                        ? "CodeSage is scanning this repository for bugs, security, and performance issues."
                        : "This review could not be completed. Start a new review to try again."}
                    </p>
                  )}
                </div>

                <div className="reviews-card-side">
                  <small>{review.reviewedAt}</small>

                  <button
                    type="button"
                    className="reviews-report-button"
                    disabled={review.status !== "completed"}
                    onClick={() => router.push("/dashboard")}
                  >
                    {review.status === "completed"
                      ? "View Report"
                      : review.status === "in-progress"
                        ? "Analyzing..."
                        : "Unavailable"}
                    {review.status === "completed" ? (
                      <ArrowRight size={14} />
                    ) : null}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="reviews-empty">
            <div className="reviews-empty-icon">
              <Sparkles size={28} />
            </div>
            <h2>No reviews match these filters</h2>
            <p>
              Try another repository, status, or search term — or start a new AI
              review.
            </p>
            <div className="reviews-empty-actions">
              <button
                type="button"
                className="reviews-secondary-button"
                onClick={() => {
                  setStatusFilter("all");
                  setRepoFilter("all");
                  setQuery("");
                }}
              >
                Clear filters
              </button>
              <button
                type="button"
                className="reviews-primary-button"
                onClick={() => setIsModalOpen(true)}
              >
                <Sparkles size={16} />
                <span>New Review</span>
              </button>
            </div>
          </div>
        )}
        </div>
      </section>

      {isModalOpen ? (
        <div className="reviews-modal-overlay" onClick={closeModal}>
          <div
            className="reviews-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="reviews-modal-header">
              <div>
                <p className="reviews-eyebrow">NEW REVIEW</p>
                <h2>Start AI analysis</h2>
                <span>
                  Choose a repository and what CodeSage should check.
                </span>
              </div>

              <button
                type="button"
                className="reviews-close-button"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            <div className="reviews-modal-body">
              <p className="reviews-modal-label">Repository</p>

              <div className="reviews-repo-list">
                {reviewRepositories.map((repo) => (
                  <button
                    type="button"
                    key={repo.id}
                    className={`reviews-repo-item ${
                      selectedRepo?.id === repo.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRepo(repo)}
                  >
                    <div>
                      <strong>{repo.name}</strong>
                      <span>
                        {repo.owner} / {repo.name}
                      </span>
                    </div>
                    <div className="reviews-repo-meta">
                      <span>{repo.language}</span>
                      <span>{repo.branch}</span>
                    </div>
                  </button>
                ))}
              </div>

              <p className="reviews-modal-label">What should we review?</p>

              <div className="reviews-type-grid">
                {reviewTypes.map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    className={`reviews-type-item ${
                      selectedTypes.includes(type.id) ? "selected" : ""
                    }`}
                    onClick={() => toggleReviewType(type.id)}
                  >
                    <strong>{type.label}</strong>
                    <span>{type.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="reviews-modal-footer">
              <span>
                {WEEKLY_LIMIT - quotaUsed} reviews left this week.
              </span>

              <div className="reviews-empty-actions">
                <button
                  type="button"
                  className="reviews-secondary-button"
                  onClick={() => router.push("/repositories")}
                >
                  Import repos
                </button>
                <button
                  type="button"
                  className="reviews-primary-button"
                  disabled={!canStartReview}
                  onClick={handleStartReview}
                >
                  <Sparkles size={16} />
                  <span>Start Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function StatCard({
  label,
  value,
  hint,
  compact = false,
}: {
  label: string;
  value: string;
  hint?: string;
  compact?: boolean;
}) {
  return (
    <div className="reviews-stat">
      <span>{label}</span>
      <strong className={compact ? "compact" : undefined}>
        {value}
        {hint ? <small>{hint}</small> : null}
      </strong>
    </div>
  );
}

function AuthorshipIcon({ authorship }: { authorship: Authorship }) {
  if (authorship === "human") return <UserRoundCheck size={12} />;
  if (authorship === "vibe") return <Bot size={12} />;
  return <Blend size={12} />;
}

function AuthorshipBadge({
  authorship,
}: {
  authorship: Authorship | null;
}) {
  if (!authorship) return null;

  return (
    <em className={`reviews-status authorship ${authorship}`}>
      <AuthorshipIcon authorship={authorship} />
      {authorshipLabel(authorship)}
    </em>
  );
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const labels = {
    completed: "Completed",
    "in-progress": "In progress",
    failed: "Failed",
  };

  return <em className={`reviews-status ${status}`}>{labels[status]}</em>;
}
