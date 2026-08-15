export function Logomark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="21" cy="7" r="4" fill="var(--accent)" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logomark className="size-6 text-text" />
      <span className="font-medium tracking-tight text-text">
        Latchpoint<span className="text-text-muted"> Studios</span>
      </span>
    </span>
  );
}
