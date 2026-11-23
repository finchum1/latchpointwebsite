"use client";

import { ReviewForm } from "../reviews/review-form";

/** The Latchpoint Websites review form: the shared review form with Websites' wording. */
export function WebsitesReviewForm() {
  return (
    <ReviewForm
      copy={{
        product: "websites",
        quotePrompt: "What was it like working with us?",
        namePlaceholder: "Jordan Reyes",
        orgLabel: "Business",
        orgPlaceholder: "Reyes Plumbing",
        emailHint: "(optional, only so we can thank you; never shown)",
        showNameText: "You can show my name and business with my review.",
        anonLabel: "An Oklahoma business owner",
        thanks: "We read every one of these. We\u2019ll look it over, and with your OK it will appear on the site.",
      }}
    />
  );
}
