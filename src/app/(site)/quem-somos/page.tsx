import { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionTitle } from "@/components/site/section-title";
import { CTASection } from "@/components/site/cta-section";
import { ValuesGrid } from "@/components/institutional/values-grid";
import { MapPin, Heart, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Quem Somos | Corretora Val",
  description:
    "Conheça a história da Corretora Val: mais de 30 anos construindo relações de confiança no mercado imobiliário de Balneário Camboriú e Camboriú.",
};

export default function QuemSomosPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Desde 1990 em Balneário Camboriú"
        title="Mais do que imóveis. Histórias, confiança e patrimônio."
        subtitle="Uma trajetória familiar dedicada a cuidar de imóveis e das vidas de quem escolhe viver ou investir no litoral catarinense."
      />

      {/* Our Story & Profile */}
      <section className="py-16 md:py-24 bg-white">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold tracking-[0.14em] text-[var(--gold)] uppercase block">
                Nossa Trajetória
              </span>
              <h2 className="display text-3xl md:text-4xl text-[var(--plum)] leading-tight">
                Uma empresa construída em família para relações que permanecem.
              </h2>
              <p className="text-base text-[var(--ink-soft)] leading-relaxed">
                A <strong>Corretora Val</strong> nasceu no início dos anos 90 com um propósito claro: oferecer um atendimento imobiliário onde o cliente não seja apenas um número de contrato, mas alguém que busca segurança para o seu patrimônio ou o lar ideal para a sua família.
              </p>
              <p className="text-base text-[var(--ink-soft)] leading-relaxed">
                Ao longo de mais de três décadas, acompanhamos o crescimento de Balneário Camboriú e Camboriú, consolidando um conhecimento profundo sobre o mercado regional e criando vínculos de confiança que ultrapassam gerações.
              </p>
            </div>

            <div className="lg:col-span-6 rounded-3xl border border-[var(--gold-light)] bg-gradient-to-br from-[var(--surface-muted)] to-[var(--surface)] p-8 md:p-12 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--gold)]">
                  <Heart size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[var(--plum)]">Quem é a Corretora Val?</h3>
                  <span className="text-xs text-[var(--gold)] font-bold uppercase tracking-wider">CRECI/SC 56372-F</span>
                </div>
              </div>

              <blockquote className="italic text-sm text-[var(--ink)] border-l-2 border-[var(--gold)] pl-4 py-1 leading-relaxed">
                &ldquo;Acreditamos que negociar imóveis é, antes de tudo, cuidar de histórias. Cada chave entregue carrega expectativas, sonhos e conquistas de uma vida inteira.&rdquo;
              </blockquote>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--plum)]">
                  <MapPin size={16} className="text-[var(--gold)]" /> Atuação Local Especializada
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--plum)]">
                  <Shield size={16} className="text-[var(--gold)]" /> Gestão Patrimonial Segura
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-muted)] border-y">
        <div className="shell">
          <SectionTitle
            eyebrow="Nossos Pilares"
            title="Princípios que orientam a nossa forma de trabalhar"
            subtitle="Valores fundamentais mantidos intactos desde o primeiro dia de portas abertas."
            align="center"
          />

          <ValuesGrid />
        </div>
      </section>

      {/* Regional Presence Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="shell">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-extrabold tracking-[0.14em] text-[var(--gold)] uppercase block">
              Atuação Regional
            </span>
            <h2 className="display text-3xl md:text-4xl text-[var(--plum)]">
              Balneário Camboriú, Camboriú e Região
            </h2>
            <p className="text-base text-[var(--ink-soft)] leading-relaxed">
              Focamos exclusivamente onde temos domínio completo: na orla e centro de Balneário Camboriú e nos bairros em expansão de Camboriú. Isso nos permite precificar com precisão, indicar as melhores oportunidades de investimento e orientar sobre a infraestrutura de cada micro-região.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Encontre seu próximo imóvel com quem entende da região."
        description="Fale com a Corretora Val e descubra opções exclusivas de venda, locação anual e administração de patrimônio."
        primaryButtonText="Falar pelo WhatsApp"
        secondaryButtonText="Ver Imóveis Disponíveis"
        secondaryButtonHref="/imoveis"
      />
    </main>
  );
}
