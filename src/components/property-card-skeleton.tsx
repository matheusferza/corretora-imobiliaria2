export function PropertyCardSkeleton() {
  return (
    <article
      className="overflow-hidden rounded-2xl bg-[var(--surface)] shadow-[0_0_0_1px_rgba(53,16,79,0.07),0_8px_20px_rgba(53,16,79,0.05)]"
      aria-hidden="true"
    >
      <div className="h-52 animate-pulse bg-[var(--surface-muted)]" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded-full bg-[var(--surface-muted)]" />
        <div className="h-7 w-4/5 animate-pulse rounded-full bg-[var(--surface-muted)]" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-[var(--surface-muted)]" />
      </div>
    </article>
  );
}
