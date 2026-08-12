import Link from "next/link";
import { Camera, Heart, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { href: "/imoveis", label: "Imóveis" },
  { href: "/locacao-anual", label: "Locação anual" },
  { href: "/temporada", label: "Temporada" },
  { href: "/administracao", label: "Administração" },
  { href: "/quem-somos", label: "Nossa história" },
];

export function SiteFooter() {
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
            Administração de patrimônio e negócios imobiliários guiados por
            confiança, cuidado e proximidade.
          </p>
        </div>

        <div>
          <p className="eyebrow text-[var(--gold-light)]">Navegação</p>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="interactive text-sm text-white/75 hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-[var(--gold-light)]">Atendimento</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2">
              <MessageCircle aria-hidden="true" size={16} /> (47) 97400-7301
            </li>
            <li className="flex gap-2">
              <Mail aria-hidden="true" size={16} /> contato@corretoraval.com.br
            </li>
            <li className="flex gap-2">
              <MapPin aria-hidden="true" size={16} /> Balneário Camboriú — SC
            </li>
          </ul>
          <a
            className="interactive mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--gold-light)] hover:text-white"
            href="https://www.instagram.com/"
            rel="noreferrer"
            target="_blank"
          >
            <Camera aria-hidden="true" size={16} /> Acompanhe no Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="shell flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} Corretora Val. Todos os direitos
            reservados.
          </span>
          <span>CRECI/SC 56372-F</span>
        </div>
      </div>
    </footer>
  );
}
