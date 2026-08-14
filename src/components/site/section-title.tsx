interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}
    >
      {eyebrow && (
        <span className="mb-2 block text-xs font-extrabold tracking-[0.14em] text-[var(--gold)] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="display text-3xl leading-tight text-[var(--plum)] md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-[var(--ink-soft)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
