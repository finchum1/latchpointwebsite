import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { Eyebrow } from "../subsite/parts";
import { getApprovedReviews, type PublicReview } from "@/lib/reviews";

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} out of 5 stars`} className="text-[15px] tracking-[0.1em] text-accent">
      {"★".repeat(n)}
      <span className="text-border-strong">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export type ReviewsBandCopy = { product: "close" | "websites" | "realestate"; eyebrow: string; heading: string; anonLabel: string; leaveLink: string };

/** What customers say about a Latchpoint product. Renders nothing until at least one review has been approved in HQ, so there is never an empty
 *  box or a placeholder. Only real, approved reviews appear. */
export async function ReviewsBand({ copy }: { copy: ReviewsBandCopy }) {
  const byline = (r: PublicReview) => (r.name ? [r.name, r.brokerage].filter(Boolean).join(", ") : copy.anonLabel);
  const reviews = await getApprovedReviews(copy.product, 6);
  if (!reviews.length) return null;
  const avg = reviews.reduce((n, r) => n + r.rating, 0) / reviews.length;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <Reveal>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
          {copy.heading}
        </h2>
        {reviews.length >= 3 && (
          <p className="mt-3 text-sm text-text-muted">
            <span className="font-medium text-text">{avg.toFixed(1)} out of 5</span> from {reviews.length} reviews
          </p>
        )}
      </Reveal>
      <RevealGroup className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <RevealItem key={r.id}>
            <figure className="flex h-full flex-col rounded-[20px] border border-border bg-bg-elevated p-6">
              <Stars n={r.rating} />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-text">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm text-text-muted">{byline(r)}</figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-6">
        <a href="/review" className="text-sm font-medium text-text underline decoration-border-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent">
          {copy.leaveLink}
        </a>
      </Reveal>
    </section>
  );
}
