import { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { SectionTitle } from "@/components/site/section-title";
import { CTASection } from "@/components/site/cta-section";
import { AuthorityStats } from "@/components/institutional/authority-stats";
import { Quote, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Autoridade e Experiência | Corretora Val",
  description:
    "Confiança imobiliária em Balneário Camboriú e Camboriú. Mais de 30 anos de mercado, registro CRECI/SC 56372-F e sólida reputação na gestão patrimonial.",
};

const testimonials = [
  {
    name: "Ricardo & Fernanda S.",
    role: "Proprietários de imóvel em Balneário Camboriú",
    content: "A Val administra nosso apartamento há mais de 8 anos. Nunca tivemos atraso de repasse e a vistoria de devolução de inquilinos é sempre impecável. Recomendo de olhos fechados.",
  },
  {
    name: "Dr. Marcelo T.",
    role: "Inquilino anual no Centro",
    content: "Atendimento transparente e sem burocracias desnecessárias. Na hora da assinatura do contrato, tudo foi explicado com muita clareza.",
  },
  {
    name: "Camila V.",
    role: "Investidora",
    content: "A orientação da Corretora Val sobre o mercado de Camboriú foi fundamental para minha primeira aquisição para rentabilidade. Experiência real da região.",
  },
];

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

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-[var(--surface-muted)] border-y">
        <div className="shell">
          <SectionTitle
            eyebrow="Depoimentos Autorizados"
            title="O que dizem os nossos clientes"
            subtitle="Histórias de proprietários, investidores e inquilinos que confiam no nosso trabalho."
            align="center"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-2xl border bg-white p-8 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[var(--gold)] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={24} className="text-[var(--gold-light)] mb-2" />
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed italic mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-bold text-sm text-[var(--plum)]">{t.name}</h4>
                  <span className="text-xs text-[var(--ink-soft)]">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Converse com quem entende a fundo o mercado imobiliário local."
        description="Fale diretamente com nossa equipe credenciada CRECI/SC 56372-F para orientações seguras."
      />
    </main>
  );
}
