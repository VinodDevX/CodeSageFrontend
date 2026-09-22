export type ReviewStatus = "completed" | "in-progress" | "failed";

export type ReviewType =
  | "bugs"
  | "security"
  | "performance"
  | "practices"
  | "authorship";

export type Authorship = "human" | "vibe" | "mixed";

export type ReviewRepository = {
  id: number;
  name: string;
  owner: string;
  language: string;
  branch: string;
};

export type AiReview = {
  id: number;
  repo: string;
  owner: string;
  branch: string;
  commit: string;
  file: string;
  lines: number;
  duration: string;
  score: number | null;
  grade: string | null;
  bugs: number;
  security: number;
  performance: number;
  bestPractices: number;
  highSeverity: number;
  authorship: Authorship | null;
  humanLikeness: number | null;
  status: ReviewStatus;
  reviewedAt: string;
};

export const reviewRepositories: ReviewRepository[] = [
  {
    id: 1,
    name: "CodeSage-Frontend",
    owner: "DeshnaJain",
    language: "TypeScript",
    branch: "main",
  },
  {
    id: 2,
    name: "AI-Code-Review",
    owner: "DeshnaJain",
    language: "JavaScript",
    branch: "main",
  },
  {
    id: 3,
    name: "Developer-Dashboard",
    owner: "DeshnaJain",
    language: "React",
    branch: "develop",
  },
  {
    id: 4,
    name: "Portfolio-Website",
    owner: "DeshnaJain",
    language: "Next.js",
    branch: "main",
  },
];

export const initialReviews: AiReview[] = [
  {
    id: 3,
    repo: "AI-Code-Review",
    owner: "DeshnaJain",
    branch: "main",
    commit: "c44e102",
    file: "reviewEngine.js",
    lines: 318,
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
  },
  {
    id: 2,
    repo: "CodeSage-Frontend",
    owner: "DeshnaJain",
    branch: "main",
    commit: "8f21c9a",
    file: "Dashboard.tsx",
    lines: 412,
    duration: "3.1s",
    score: 88,
    grade: "B",
    bugs: 2,
    security: 1,
    performance: 2,
    bestPractices: 9,
    highSeverity: 1,
    authorship: "mixed",
    humanLikeness: 68,
    status: "completed",
    reviewedAt: "2 hours ago",
  },
  {
    id: 1,
    repo: "codesage-web-app",
    owner: "DeshnaJain",
    branch: "feature/auth-improvements",
    commit: "a1b2c3d",
    file: "index.js",
    lines: 245,
    duration: "2.4s",
    score: 96,
    grade: "A",
    bugs: 3,
    security: 2,
    performance: 1,
    bestPractices: 12,
    highSeverity: 2,
    authorship: "human",
    humanLikeness: 92,
    status: "completed",
    reviewedAt: "May 28, 2025 · 10:30 AM",
  },
  {
    id: 4,
    repo: "Developer-Dashboard",
    owner: "DeshnaJain",
    branch: "develop",
    commit: "b7d90e4",
    file: "UserDashboard.tsx",
    lines: 186,
    duration: "1.8s",
    score: 74,
    grade: "C",
    bugs: 4,
    security: 3,
    performance: 2,
    bestPractices: 5,
    highSeverity: 3,
    authorship: "vibe",
    humanLikeness: 34,
    status: "completed",
    reviewedAt: "Yesterday",
  },
  {
    id: 5,
    repo: "Portfolio-Website",
    owner: "DeshnaJain",
    branch: "main",
    commit: "e19a55c",
    file: "page.tsx",
    lines: 97,
    duration: "—",
    score: null,
    grade: null,
    bugs: 0,
    security: 0,
    performance: 0,
    bestPractices: 0,
    highSeverity: 0,
    authorship: null,
    humanLikeness: null,
    status: "failed",
    reviewedAt: "2 days ago",
  },
];

export const reviewTypes: { id: ReviewType; label: string; text: string }[] = [
  {
    id: "bugs",
    label: "Bugs",
    text: "Find uncaught errors and broken logic",
  },
  {
    id: "security",
    label: "Security",
    text: "Catch vulnerabilities before they ship",
  },
  {
    id: "performance",
    label: "Performance",
    text: "Spot slow patterns and extra work",
  },
  {
    id: "practices",
    label: "Best Practices",
    text: "Keep the codebase clean and consistent",
  },
  {
    id: "authorship",
    label: "Authorship",
    text: "Check if it looks vibe-coded or carefully human-written",
  },
];

export function fileForLanguage(language: string) {
  if (language === "TypeScript") return "App.tsx";
  if (language === "JavaScript") return "index.js";
  if (language === "React") return "Dashboard.tsx";
  return "page.tsx";
}

export function gradeForScore(score: number) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "D";
}

export function authorshipForLikeness(humanLikeness: number): Authorship {
  if (humanLikeness >= 75) return "human";
  if (humanLikeness >= 50) return "mixed";
  return "vibe";
}

export function authorshipLabel(authorship: Authorship) {
  if (authorship === "human") return "Human-written";
  if (authorship === "vibe") return "Vibe-coded";
  return "Mixed signals";
}
