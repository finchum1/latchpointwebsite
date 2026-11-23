"use client";

import { ReviewForm } from "../reviews/review-form";

/** The Latchpoint Close review form: the shared review form with Close's wording. */
export function CloseReviewForm() {
  return (
    <ReviewForm
      copy={{
        product: "close",
        quotePrompt: "What was it like working with me?",
        namePlaceholder: "Jordan Reyes",
        orgLabel: "Brokerage",
        orgPlaceholder: "Reyes Realty Group",
        emailHint: "(optional, only so I can thank you; never shown)",
        showNameText: "You can show my name and brokerage with my review.",
        anonLabel: "An Oklahoma agent",
        thanks: "I read every one of these. I\u2019ll look it over, and with your OK it will appear on the site.",
      }}
    />
  );
}
