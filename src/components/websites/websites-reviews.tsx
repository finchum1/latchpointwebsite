import { ReviewsBand } from "../reviews/reviews-band";

/** What customers say about Latchpoint Websites (the shared reviews section with Websites' wording). Hidden until a review is approved. */
export function WebsitesReviews() {
  return (
    <ReviewsBand
      copy={{
        product: "websites",
        eyebrow: "What customers say",
        heading: "From the business owners we\u2019ve built for.",
        anonLabel: "An Oklahoma business owner",
        leaveLink: "Worked with us? Leave a review",
      }}
    />
  );
}
