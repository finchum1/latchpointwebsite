/**
 * The Latchpoint mark. With `animated`, the ember square pulls back and snaps
 * into the corner with a small settle and an outward pulse, then holds before
 * repeating -- the same loop as the animated email-signature GIF. The motion
 * is plain CSS (see `.lp-logo-anim` in globals.css), so it costs no JavaScript
 * and switches itself off under prefers-reduced-motion.
 */
export function Logomark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="2.5 1.2 20.3 20.3"
      fill="none"
      className={`${className}${animated ? " lp-logo-anim overflow-visible" : ""}`}
      aria-hidden="true"
    >
      {animated && (
        // Ring that radiates off the chip when it latches; invisible until then.
        <rect className="lp-pulse" x="14.8" y="1.2" width="8" height="8" rx="2.7" stroke="var(--accent)" strokeWidth="0.7" />
      )}
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect className={animated ? "lp-chip" : undefined} x="14.8" y="1.2" width="8" height="8" rx="2.7" fill="var(--accent)" />
    </svg>
  );
}

export function Wordmark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logomark className="size-6 text-text" animated={animated} />
      <span className="font-medium tracking-tight text-text">
        Latchpoint<span className="text-text-muted"> Studios</span>
      </span>
    </span>
  );
}
