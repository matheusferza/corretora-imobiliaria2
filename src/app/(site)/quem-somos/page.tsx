import {
  Award,
  Compass,
  MapPin,
  Quote,
  Shield,
  Target,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { ValuesGrid } from "@/components/institutional/values-grid";
import { CTASection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { SectionTitle } from "@/components/site/section-title";

export const metadata: Metadata = {
  title: "Quem Somos | Corretora Val",
  description:
    "Conheça a história de Valdete Gonçalves de Melo e a trajetória da Corretora Val em Balneário Camboriú e Camboriú: trabalho, família, compromisso e confiança desde 1989.",
};

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="QUEM SOMOS"
        title="Minha História. Meu Compromisso."
        subtitle="Desde 1989, uma trajetória construída com trabalho, família e confiança."
      />

      {/* Main Biography Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-extrabold tracking-[0.14em] text-[var(--gold)] uppercase block">
                História de Dedicação & Superação
              </span>
              <h2 className="display text-3xl md:text-4xl text-[var(--plum)] leading-tight">
                Valdete Gonçalves de Melo
              </h2>

              <p className="text-base text-[var(--ink)] leading-relaxed font-semibold">
                Meu nome é Valdete Gonçalves de Melo, fundadora da Corretora
                Val, especialista em Administração de Imóveis, Locação Anual,
                Temporada e Compra e Venda, com atuação em Balneário Camboriú e
                Camboriú.
              </p>

              <div className="space-y-4 text-sm text-[var(--ink-soft)] leading-relaxed">
                <p>
                  Minha história no mercado imobiliário teve início em{" "}
                  <strong>1989</strong>, com o convite que abriu a primeira
                  porta para trabalhar na tradicional Imobiliária Gonzaga, em
                  Curitiba. Foi em <strong>1990</strong> que iniciei
                  oficialmente minha trajetória profissional no setor, começando
                  como secretária e, com o tempo, passando a apresentar imóveis,
                  realizar vistorias e intermediar relações entre proprietários
                  e locatários.
                </p>
                <p>
                  A vida me levou por outros caminhos durante muitos anos, mas
                  nunca apagou o sonho de voltar ao mercado imobiliário.
                </p>
                <p>
                  Durante 25 anos, trabalhei como motoboy para sustentar minha
                  família, sempre acreditando que o trabalho honesto abriria
                  novas portas.
                </p>
                <p>
                  Também tive a honra de presidir a{" "}
                  <strong>
                    AMAE – Associação de Apoio à Criança e ao Adolescente com
                    Mobilidade Reduzida e com Câncer
                  </strong>
                  , uma experiência que fortaleceu ainda mais meu compromisso
                  com o cuidado, a responsabilidade e o respeito pelas pessoas.
                </p>
                <p>
                  Em <strong>2019</strong>, já em Balneário Camboriú, retornei
                  ao mercado imobiliário e reencontrei a profissão que sempre
                  fez parte da minha essência.
                </p>
                <p className="font-bold text-[var(--plum)] text-base pt-2">
                  Foi dessa trajetória que nasceu a Corretora Val.
                </p>
                <p>
                  Hoje, atuamos com foco na administração de patrimônios,
                  locação anual, temporada e compra e venda de imóveis,
                  oferecendo um atendimento próximo, transparente e organizado.
                </p>
                <p>
                  Mais do que intermediar negócios, acreditamos em construir
                  relacionamentos duradouros, baseados na confiança e no
                  respeito.
                </p>
              </div>

              {/* Personal Gratitude & Overcoming Highlight */}
              <div className="rounded-3xl border border-[var(--gold-light)] bg-gradient-to-r from-[var(--surface-muted)] to-[var(--surface)] p-6 md:p-8 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--gold)] shrink-0 mt-1">
                    <Quote size={20} />
                  </div>
                  <div className="space-y-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--gold)]">
                      Palavras da Fundadora
                    </span>
                    <p className="text-base text-[var(--plum)] font-medium italic leading-relaxed">
                      &ldquo;Quero agradecer primeiramente por me ajudar a
                      realizar um sonho guardado desde que resolvi caminhar aqui
                      sozinha. Na pandemia fui dispensada do trabalho, sem rumo.
                      A Michely e o Felipe me mostraram que eu era capaz — as
                      palavras deles e o presente da Michely, me presenteando
                      com o curso do CRECI, me fizeram acreditar que sou
                      capaz.&rdquo;
                    </p>
                    <p className="text-xs font-bold text-[var(--ink-soft)]">
                      — Valdete Gonçalves de Melo · CRECI/SC 56372-F
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Institutional Profile Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-[var(--gold-light)] bg-gradient-to-br from-[var(--surface-muted)] to-[var(--surface)] p-8 md:p-10 shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--gold)]">
                    <Award size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[var(--plum)]">
                      Corretora Val
                    </h3>
                    <span className="text-xs text-[var(--gold)] font-bold uppercase tracking-wider block">
                      Valdete Gonçalves de Melo
                    </span>
                    <span className="text-xs text-[var(--ink-soft)] font-bold uppercase">
                      CRECI/SC 56372-F
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--plum)]">
                    <MapPin size={16} className="text-[var(--gold)] shrink-0" />{" "}
                    Balneário Camboriú & Camboriú — SC
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--plum)]">
                    <Shield size={16} className="text-[var(--gold)] shrink-0" />{" "}
                    Administração, Locação Anual, Temporada e Vendas
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 border text-center space-y-1">
                  <span className="display text-2xl font-bold text-[var(--plum)]">
                    Confiança que abre portas.
                  </span>
                  <p className="text-xs text-[var(--gold)] font-extrabold uppercase tracking-wider">
                    Slogan Institucional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-muted)] border-y">
        <div className="shell">
          <SectionTitle
            eyebrow="Propósito Institucional"
            title="Nossa Missão & Nossa Visão"
            subtitle="Direcionadores fundamentais que conduzem a nossa atuação diária."
            align="center"
          />

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-3xl border bg-white p-8 md:p-10 shadow-xs space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--plum)] text-[var(--gold)]">
                <Target size={24} />
              </div>
              <h3 className="display text-2xl font-bold text-[var(--plum)]">
                Nossa Missão
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                Administrar patrimônios com responsabilidade, transparência e
                organização, oferecendo segurança para proprietários e
                tranquilidade para inquilinos, sempre por meio de um atendimento
                humano e personalizado.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8 md:p-10 shadow-xs space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--plum)] text-[var(--gold)]">
                <Compass size={24} />
              </div>
              <h3 className="display text-2xl font-bold text-[var(--plum)]">
                Nossa Visão
              </h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                Ser reconhecida como referência em administração de imóveis e
                locações em Balneário Camboriú e Camboriú, unindo experiência,
                inovação e relacionamento de confiança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="shell">
          <SectionTitle
            eyebrow="Pilares Éticos"
            title="Nossos Valores"
            subtitle="Princípios que orientam cada contrato, atendimento e negociação."
            align="center"
          />

          <ValuesGrid />
        </div>
      </section>

      {/* Family Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-muted)] border-y">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[var(--gold-light)] bg-[linear-gradient(145deg,#35104F_0%,#4A1768_100%)] p-8 text-white shadow-md">
                <div className="flex size-12 items-center justify-center rounded-full bg-white/10 text-[var(--gold-light)] mb-6">
                  <Users size={24} />
                </div>
                <span className="eyebrow text-[var(--gold-light)]">
                  Base de Cada Recomeço
                </span>
                <h3 className="display text-3xl md:text-4xl text-white mt-2 mb-4">
                  Uma empresa construída em família.
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Valores transmitidos de geração em geração com dedicação,
                  honestidade e amor pelo que fazemos.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold tracking-[0.14em] text-[var(--gold)] uppercase block">
                Nossa Família
              </span>
              <h2 className="display text-3xl md:text-4xl text-[var(--plum)]">
                A Corretora Val é uma empresa construída em família.
              </h2>
              <p className="text-base text-[var(--ink-soft)] leading-relaxed">
                Ao meu lado caminham meu filho{" "}
                <strong>Felipe Cesar Gonçalves de Melo</strong>, que atua na
                gestão da empresa, meu neto <strong>Kauan Enrique Otto</strong>,
                representando a nova geração do mercado imobiliário, e toda a
                minha família, que sempre foi a base de cada recomeço.
              </p>
              <p className="text-base text-[var(--ink-soft)] leading-relaxed">
                Minha filha <strong>Michely</strong>, meu genro{" "}
                <strong>Marcos</strong>, meus netos <strong>Malu</strong> e{" "}
                <strong>Raul</strong>, e minha mãe <strong>Dileia</strong> fazem
                parte da história que inspira a Corretora Val todos os dias. São
                eles que me lembram por que vale a pena trabalhar com dedicação,
                honestidade e amor pelo que faço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="shell max-w-4xl">
          <div className="rounded-3xl border border-[var(--gold-light)] bg-gradient-to-br from-[var(--plum)] to-[#4A1768] p-8 md:p-14 text-white shadow-xl space-y-6 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-full bg-white/10 text-[var(--gold-light)] mb-2">
              <Quote size={28} />
            </div>
            <span className="eyebrow text-[var(--gold-light)] block">
              Compromisso de Vida
            </span>
            <h2 className="display text-3xl md:text-5xl text-white">
              Nosso Manifesto
            </h2>

            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed italic max-w-2xl mx-auto pt-2">
              <p>&ldquo;Não acreditamos que imóveis sejam apenas paredes.</p>
              <p>Cada chave representa um novo começo.</p>
              <p>Cada contrato simboliza confiança.</p>
              <p>Cada cliente faz parte da nossa história.</p>
              <p>
                É por isso que trabalhamos todos os dias com responsabilidade,
                transparência e respeito.
              </p>
              <p className="font-bold text-[var(--gold-light)] not-italic text-lg md:text-xl pt-3">
                Porque mais do que administrar imóveis, administramos
                patrimônios, construímos confiança e aproximamos pessoas do
                lugar onde viverão novas histórias.&rdquo;
              </p>
            </div>

            <div className="pt-8 border-t border-white/20 inline-block text-center">
              <p className="display text-2xl text-white font-bold">
                Valdete Gonçalves de Melo
              </p>
              <p className="text-xs text-[var(--gold-light)] font-extrabold uppercase tracking-widest mt-1">
                Corretora Val · CRECI/SC 56372-F
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Confiança que abre portas."
        description="Fale diretamente comigo para cuidar do seu imóvel com a atenção, o carinho e a segurança que seu patrimônio merece."
        primaryButtonText="Falar pelo WhatsApp"
        secondaryButtonText="Ver Nossos Imóveis"
        secondaryButtonHref="/imoveis"
      />
    </main>
  );
}
