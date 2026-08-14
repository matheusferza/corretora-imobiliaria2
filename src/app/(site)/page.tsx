import { ArrowRight, Building2, KeyRound, ShieldCheck } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Building2,
    title: "Administração patrimonial",
    text: "Cuidado completo para o seu imóvel, com organização, clareza e acompanhamento próximo.",
  },
  {
    icon: KeyRound,
    title: "Locação e temporada",
    text: "Escolhas seguras para quem busca viver, alugar ou desfrutar o litoral em cada estação.",
  },
  {
    icon: ShieldCheck,
    title: "Compra e venda",
    text: "Negociações conduzidas com escuta, transparência e conhecimento da nossa região.",
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
                Desde 1990
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
            <p className="eyebrow">Uma relação de confiança</p>
            <h2 className="display mt-4 text-4xl leading-none text-[var(--plum)] sm:text-5xl">
              Tudo o que seu imóvel precisa, com o cuidado que você espera.
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  className="interactive rounded-2xl bg-[var(--background)] p-7 shadow-[0_0_0_1px_rgba(53,16,79,0.07),0_2px_4px_rgba(53,16,79,0.04)] hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(53,16,79,0.1),0_14px_28px_rgba(53,16,79,0.1)]"
                  key={service.title}
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--gold-light)]">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <h3 className="display mt-6 text-3xl text-[var(--plum)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                    {service.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
