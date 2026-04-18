export function Logo() {
  return (
    <span
      aria-hidden
      className="relative flex size-7 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-primary via-primary to-primary/70 shadow-sm ring-1 ring-primary/30 ring-inset"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/25 to-transparent" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.75}
        strokeLinecap="round"
        className="relative size-4 text-primary-foreground"
      >
        <path d="M5 13.5h14" />
        <circle
          cx="18.25"
          cy="6.75"
          r="1.35"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </span>
  );
}
