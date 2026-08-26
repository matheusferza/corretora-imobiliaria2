import {
  ArrowRight,
  Building2,
  CalendarDays,
  KeyRound,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: ShoppingBag,
    title: "Comprar",
    text: "Oportunidades selecionadas de imóveis para compra com análise documental completa e segurança jurídica.",
    href: "/imoveis",
  },
  {
    icon: KeyRound,
    title: "Alugar",
    text: "Locação anual transparente, com análise rigorosa e contratos seguros para inquilinos e proprietários.",
    href: "/imoveis",
  },
  {
    icon: CalendarDays,
    title: "Temporada",
    text: "Imóveis exclusivos para desfrutar o litoral de Balneário Camboriú com conforto em cada temporada.",
    href: "/imoveis",
  },
  {
    icon: Building2,
    title: "Administrar",
    text: "Gestão patrimonial dedicada, com vistorias criteriosas, repasses pontuais e suporte completo.",
    href: "/administracao",
  },
];

export default function Home() {
  return (
    <main>
      <section className="shell grid min-h-[calc(100dvh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1fr_0.92fr] lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow fade-up">Balneário Camboriú e Camboriú</p>
          <h1 className="display fade-up-delay mt-5 text-5xl leading-[0.92] text-[var(--plum)] sm:text-6xl lg:text-8xl">
            Confiança que{" "}
            <em className="font-normal text-[var(--gold)]">abre</em> portas.
          </h1>
          <p className="fade-up-delay mt-7 max-w-xl text-base leading-8 text-[var(--ink-soft)] sm:text-lg">
            Há mais de três décadas, transformamos imóveis em histórias bem
            cuidadas — com atendimento humano, gestão responsável e compromisso
            real com o seu patrimônio.
          </p>
          <div className="fade-up-delay mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              className="interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--plum)] px-6 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(53,16,79,0.18)] hover:-translate-y-0.5 hover:bg-[var(--plum-bright)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              href="/imoveis"
            >
              Conheça nossos imóveis <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <Link
              className="interactive inline-flex min-h-12 items-center justify-center gap-2 rounded-full border bg-[var(--surface)] px-6 text-sm font-extrabold text-[var(--plum)] hover:border-[var(--gold)] hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
              href="/administracao"
            >
              Administrar meu imóvel
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#35104F_0%,#4A1768_58%,#765184_100%)] p-8 text-white shadow-[0_24px_60px_rgba(53,16,79,0.24)] sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(216,189,130,0.28),transparent_30%),radial-gradient(circle_at_10%_100%,rgba(255,255,255,0.13),transparent_35%)]" />
            <div className="relative">
              <span className="eyebrow text-[var(--gold-light)]">
                Desde 1989
              </span>
              <p className="display mt-10 max-w-sm text-4xl leading-none sm:text-5xl">
                Mais que imóveis, cuidamos de histórias.
              </p>
              <div className="mt-12 border-t border-white/20 pt-5">
                <p className="text-sm leading-6 text-white/75">
                  Uma empresa construída em família, para relações que
                  permanecem muito depois da entrega das chaves.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -right-3 -bottom-5 hidden w-48 rounded-2xl border border-[var(--gold-light)] bg-[var(--surface)] p-5 text-[var(--plum)] shadow-[0_14px_35px_rgba(53,16,79,0.16)] sm:block">
            <p className="eyebrow">Atendimento próximo</p>
            <p className="display mt-2 text-2xl leading-tight">
              Cada chave, um novo começo.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-[var(--surface)] py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Áreas de Atuação</p>
            <h2 className="display mt-4 text-4xl leading-none text-[var(--plum)] sm:text-5xl">
              Tudo o que seu imóvel precisa, com o cuidado que você espera.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  href={service.href}
                  key={service.title}
                  className="interactive flex flex-col justify-between rounded-2xl bg-[var(--background)] p-7 shadow-[0_0_0_1px_rgba(53,16,79,0.07),0_2px_4px_rgba(53,16,79,0.04)] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(53,16,79,0.1),0_14px_28px_rgba(53,16,79,0.1)] transition-all group"
                >
                  <div>
                    <span className="flex size-11 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--gold-light)] group-hover:scale-105 transition-transform">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <h3 className="display mt-6 text-3xl text-[var(--plum)]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                      {service.text}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-extrabold text-[var(--gold)] uppercase tracking-wider">
                    Saiba mais <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
