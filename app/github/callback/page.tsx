import { Suspense } from "react";
import GithubCallback from "@/features/auth/components/GithubCallback";
import "@/features/auth/components/GithubCallback.css";

export default function GithubCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="github-callback">
          <div className="github-callback-card">
            <h1>GitHub is logging you in</h1>
            <p>Please wait while GitHub finishes signing you in.</p>
          </div>
        </div>
      }
    >
      <GithubCallback />
    </Suspense>
  );
}
