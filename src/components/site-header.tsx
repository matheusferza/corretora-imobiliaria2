import Link from "next/link";
import { ChevronDown, Heart, Menu, MessageCircle } from "lucide-react";

const navigation = [
  { href: "/imoveis", label: "Imóveis" },
  { href: "/locacao-anual", label: "Locação anual" },
  { href: "/temporada", label: "Temporada" },
  { href: "/administracao", label: "Administração" },
  { href: "/quem-somos", label: "História" },
];

export function SiteHeader() {
  return (
    <header className="border-b bg-[rgba(248,245,239,0.92)] backdrop-blur-md">
      <div className="shell flex min-h-20 items-center justify-between gap-6">
        <Link
          className="interactive group flex items-center gap-2 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          href="/"
          aria-label="Corretora Val — página inicial"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-[var(--gold-light)] bg-[var(--surface)] text-[var(--plum)] shadow-[0_2px_12px_rgba(53,16,79,0.08)]">
            <Heart aria-hidden="true" size={17} strokeWidth={1.7} />
          </span>
          <span className="leading-none">
            <span className="display block text-[2rem] leading-[0.65] text-[var(--plum)]">
              Val
            </span>
            <span className="mt-2 block text-[0.48rem] font-extrabold tracking-[0.16em] text-[var(--ink-soft)] uppercase">
              Corretora de imóveis
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-5 xl:flex"
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <Link
              className="interactive rounded-sm py-2 text-[0.68rem] font-extrabold tracking-[0.06em] text-[var(--ink)] uppercase hover:text-[var(--plum-bright)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="interactive rounded-sm py-2 text-[0.68rem] font-extrabold tracking-[0.06em] text-[var(--ink)] uppercase hover:text-[var(--plum-bright)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
            href="/blog"
          >
            Blog
          </Link>
        </nav>

        <a
          className="interactive hidden items-center gap-2 rounded-full bg-[var(--plum)] px-4 py-3 text-[0.68rem] font-extrabold tracking-[0.06em] text-white uppercase shadow-[0_8px_20px_rgba(53,16,79,0.2)] hover:-translate-y-0.5 hover:bg-[var(--plum-bright)] md:flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          href="https://wa.me/5547974007301"
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle aria-hidden="true" size={16} />
          WhatsApp
        </a>

        <details className="relative xl:hidden">
          <summary className="interactive flex size-11 cursor-pointer list-none items-center justify-center rounded-full border bg-[var(--surface)] text-[var(--plum)] marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" size={20} />
            <span className="sr-only">Abrir navegação</span>
          </summary>
          <nav
            className="absolute top-[calc(100%+0.75rem)] right-0 z-20 flex w-72 origin-top-right flex-col rounded-2xl border bg-[var(--surface)] p-2 shadow-[0_18px_50px_rgba(53,16,79,0.16)]"
            aria-label="Navegação móvel"
          >
            {navigation.map((item) => (
              <Link
                className="interactive flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface-muted)] hover:text-[var(--plum)]"
                href={item.href}
                key={item.href}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  className="-rotate-90 text-[var(--gold)]"
                  size={15}
                />
              </Link>
            ))}
            <a
              className="interactive mt-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--plum)] px-4 py-3 text-sm font-extrabold text-white hover:bg-[var(--plum-bright)]"
              href="https://wa.me/5547974007301"
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" size={16} />
              Falar pelo WhatsApp
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
