import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbCurrent?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbCurrent,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-[var(--surface-muted)] to-[var(--surface)] py-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(53,16,79,0.03),transparent_70%)] pointer-events-none" />
      <div className="shell relative z-10">
        {breadcrumbCurrent && (
          <nav aria-label="Navegação hierárquica" className="mb-6 flex items-center gap-2 text-xs font-semibold text-[var(--ink-soft)]">
            <Link className="hover:text-[var(--plum-bright)] transition-colors" href="/">
              Início
            </Link>
            <ChevronRight size={14} className="text-[var(--gold)]" />
            <span className="text-[var(--ink)]">{breadcrumbCurrent}</span>
          </nav>
        )}

        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--gold-light)] bg-white px-4 py-1.5 text-[0.7rem] font-extrabold tracking-[0.14em] text-[var(--gold)] uppercase shadow-xs">
            {eyebrow}
          </div>
        )}

        <h1 className="display max-w-4xl text-4xl leading-[1.1] text-[var(--plum)] md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-[var(--ink-soft)] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
