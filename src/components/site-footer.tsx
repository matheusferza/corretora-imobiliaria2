import { getPublishedPages, getSiteSettings } from "@/lib/site-content";
import { Camera, Heart, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

export async function SiteFooter() {
  const [settings, pages] = await Promise.all([
    getSiteSettings(),
    getPublishedPages(),
  ]);
  const quickLinks = pages.filter((page) =>
    ["administracao", "quem-somos", "contato"].includes(page.slug),
  );
  return (
    <footer className="mt-auto bg-[var(--plum)] text-white">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.25fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full border border-[rgba(216,189,130,0.5)] text-[var(--gold-light)]">
              <Heart aria-hidden="true" size={17} />
            </span>
            <span className="display text-4xl">Val</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
            {settings.tagline}
          </p>
        </div>
        <div>
          <p className="eyebrow text-[var(--gold-light)]">Navegação</p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                className="interactive text-sm text-white/75 hover:text-white"
                href="/imoveis"
              >
                Imóveis
              </Link>
            </li>
            {quickLinks.map((page) => (
              <li key={page.slug}>
                <Link
                  className="interactive text-sm text-white/75 hover:text-white"
                  href={`/${page.slug}`}
                >
                  {page.navigationLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-[var(--gold-light)]">Atendimento</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            {settings.phone && (
              <li className="flex gap-2">
                <MessageCircle aria-hidden="true" size={16} /> {settings.phone}
              </li>
            )}
            {settings.email && (
              <li className="flex gap-2">
                <Mail aria-hidden="true" size={16} /> {settings.email}
              </li>
            )}
            {settings.address && (
              <li className="flex gap-2">
                <MapPin aria-hidden="true" size={16} /> {settings.address}
              </li>
            )}
          </ul>
          {settings.instagramUrl && (
            <a
              className="interactive mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-light)] hover:text-white"
              href={settings.instagramUrl}
              rel="noreferrer"
              target="_blank"
            >
              <Camera aria-hidden="true" size={16} /> Acompanhe no Instagram
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {settings.brandName}. Todos os direitos
            reservados.
          </span>
          <span>{settings.creci}</span>
        </div>
      </div>
    </footer>
  );
}
