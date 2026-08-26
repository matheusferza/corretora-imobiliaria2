import { MessageSquareText, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { AuthorityStats } from "@/components/institutional/authority-stats";
import { CTASection } from "@/components/site/cta-section";
import { PageHero } from "@/components/site/page-hero";
import { SectionTitle } from "@/components/site/section-title";

export const metadata: Metadata = {
  title: "Autoridade e Experiência | Corretora Val",
  description:
    "Confiança imobiliária em Balneário Camboriú e Camboriú. Mais de 35 anos de experiência, registro CRECI/SC 56372-F e sólida reputação na gestão patrimonial.",
};

export default function AutoridadePage() {
  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Confiança & Experiência"
        title="Experiência que transforma negócios imobiliários em decisões seguras."
        subtitle="Conhecimento profundo do mercado catarinense amparado por registro profissional, processos estruturados e reputação construída ao longo de décadas."
      />

      {/* Stats & Trust Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="shell">
          <SectionTitle
            eyebrow="Prova de Autoridade"
            title="Números e credibilidade no mercado local"
            subtitle="Estrutura de atuação pensada para oferecer máxima segurança em compra, venda e locação."
          />

          <AuthorityStats />
        </div>
      </section>

      {/* Testimonials Section - Em Breve */}
      <section className="py-16 md:py-24 bg-[var(--surface-muted)] border-y">
        <div className="shell max-w-4xl">
          <SectionTitle
            eyebrow="Depoimentos Reais"
            title="O que dizem os nossos clientes"
            subtitle="Histórias de proprietários, investidores e inquilinos que confiam no nosso trabalho."
            align="center"
          />

          <div className="rounded-3xl border border-[var(--gold-light)] bg-white p-8 md:p-12 shadow-xs text-center space-y-4">
            <div className="inline-flex size-14 items-center justify-center rounded-full bg-[var(--plum)] text-[var(--gold-light)] mb-2 shadow-xs">
              <MessageSquareText size={26} />
            </div>
            <h3 className="display text-2xl md:text-3xl text-[var(--plum)] font-bold">
              Em breve, depoimentos reais de clientes da Corretora Val
            </h3>
            <p className="text-sm text-[var(--ink-soft)] max-w-xl mx-auto leading-relaxed">
              Estamos reunindo os relatos e histórias de clientes que acompanham
              nossa trajetória ao longo dos anos. Todas as avaliações serão
              publicadas mediante autorização formal e expressa.
            </p>
            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-bold text-[var(--gold)] uppercase tracking-wider">
              <ShieldCheck size={16} /> Compromisso com transparência e
              autenticidade
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Converse com quem entende a fundo o mercado imobiliário local."
        description="Fale diretamente comigo, Valdete Gonçalves de Melo (CRECI/SC 56372-F), para orientações seguras e atendimento personalizado."
      />
    </main>
  );
}
