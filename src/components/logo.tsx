export function Logo() {
  return (
    <span
      aria-hidden
      className="flex size-7 items-center justify-center rounded-lg bg-primary shadow-sm"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        className="size-4.5 text-primary-foreground"
      >
        <path d="M5 13.5h14" />
        <circle
          cx="18.25"
          cy="6.75"
          r="1.6"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </span>
  );
}
