import { Suspense } from "react";
import AiReviews from "@/features/ai-reviews/components/AiReviews";

export default function AiReviewsPage() {
  return (
    <Suspense>
      <AiReviews />
    </Suspense>
  );
}
