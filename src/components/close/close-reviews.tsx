import { ReviewsBand } from "../reviews/reviews-band";

/** What agents say about Latchpoint Close (the shared reviews section with Close's wording). Hidden until a review is approved. */
export function CloseReviews() {
  return (
    <ReviewsBand
      copy={{
        product: "close",
        eyebrow: "What agents say",
        heading: "Straight from the agents whose files I\u2019ve run.",
        anonLabel: "An Oklahoma agent",
        leaveLink: "Worked with me? Leave a review",
      }}
    />
  );
}
