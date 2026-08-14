import { getPublishedPages, getSiteSettings } from "@/lib/site-content";
import { ChevronDown, Heart, Menu, MessageCircle } from "lucide-react";
import Link from "next/link";

const navigationSlugs = [
  "administracao",
  "quem-somos",
  "autoridade",
  "memoria-viva",
  "blog",
  "contato",
];

const fallbackNavigation = [
  { slug: "administracao", label: "Administração" },
  { slug: "quem-somos", label: "Quem Somos" },
  { slug: "autoridade", label: "Autoridade" },
  { slug: "memoria-viva", label: "Memória Viva" },
  { slug: "blog", label: "Blog" },
  { slug: "contato", label: "Contato" },
];

export async function SiteHeader() {
  const [settings, pages] = await Promise.all([
    getSiteSettings(),
    getPublishedPages().catch(() => []),
  ]);

  const dbNav = pages.filter((page) => navigationSlugs.includes(page.slug));
  const navigation =
    dbNav.length > 0
      ? dbNav.map((p) => ({ slug: p.slug, label: p.navigationLabel }))
      : fallbackNavigation;

  const whatsappUrl = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp}`
    : "/contato";

  return (
    <header className="sticky top-0 z-50 border-b bg-[rgba(248,245,239,0.95)] backdrop-blur-md shadow-xs">
      <div className="shell flex min-h-20 items-center justify-between gap-6">
        <Link
          aria-label={`${settings.brandName} — página inicial`}
          className="interactive group flex items-center gap-2 rounded-sm py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          href="/"
        >
          <span className="flex size-9 items-center justify-center rounded-full border border-[var(--gold-light)] bg-[var(--surface)] text-[var(--plum)] shadow-[0_2px_12px_rgba(53,16,79,0.08)]">
            <Heart aria-hidden="true" size={17} strokeWidth={1.7} />
          </span>
          <span className="leading-none">
            <span className="display block text-[2rem] leading-[0.65] text-[var(--plum)]">
              Val
            </span>
            <span className="mt-2 block text-[0.48rem] font-extrabold tracking-[0.16em] text-[var(--ink-soft)] uppercase">
              {settings.brandName}
            </span>
          </span>
        </Link>
        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-5 xl:flex"
        >
          <Link
            className="interactive rounded-sm py-2 text-[0.68rem] font-extrabold tracking-[0.06em] text-[var(--ink)] uppercase hover:text-[var(--plum-bright)]"
            href="/imoveis"
          >
            Imóveis
          </Link>
          {navigation.map((item) => (
            <Link
              className="interactive rounded-sm py-2 text-[0.68rem] font-extrabold tracking-[0.06em] text-[var(--ink)] uppercase hover:text-[var(--plum-bright)]"
              href={`/${item.slug}`}
              key={item.slug}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="interactive hidden items-center gap-2 rounded-full bg-[var(--plum)] px-4 py-3 text-[0.68rem] font-extrabold tracking-[0.06em] text-white uppercase shadow-[0_8px_20px_rgba(53,16,79,0.2)] hover:-translate-y-0.5 hover:bg-[var(--plum-bright)] md:flex"
          href={whatsappUrl}
          rel="noreferrer"
          target={whatsappUrl.startsWith("http") ? "_blank" : undefined}
        >
          <MessageCircle aria-hidden="true" size={16} /> WhatsApp
        </a>
        <details className="relative xl:hidden">
          <summary className="interactive flex size-11 cursor-pointer list-none items-center justify-center rounded-full border bg-[var(--surface)] text-[var(--plum)] [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" size={20} />
            <span className="sr-only">Abrir navegação</span>
          </summary>
          <nav
            aria-label="Navegação móvel"
            className="absolute top-[calc(100%+0.75rem)] right-0 z-20 flex w-72 origin-top-right flex-col rounded-2xl border bg-[var(--surface)] p-2 shadow-[0_18px_50px_rgba(53,16,79,0.16)]"
          >
            <Link
              className="interactive flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface-muted)]"
              href="/imoveis"
            >
              Imóveis
              <ChevronDown
                aria-hidden="true"
                className="-rotate-90 text-[var(--gold)]"
                size={15}
              />
            </Link>
            {navigation.map((item) => (
              <Link
                className="interactive flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[var(--ink)] hover:bg-[var(--surface-muted)]"
                href={`/${item.slug}`}
                key={item.slug}
              >
                {item.label}
                <ChevronDown
                  aria-hidden="true"
                  className="-rotate-90 text-[var(--gold)]"
                  size={15}
                />
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
