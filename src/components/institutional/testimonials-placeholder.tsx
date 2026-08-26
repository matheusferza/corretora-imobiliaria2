import { MessageSquareText, ShieldCheck } from "lucide-react";
import { SectionTitle } from "@/components/site/section-title";

interface TestimonialsPlaceholderProps {
  showTitle?: boolean;
  className?: string;
}

export function TestimonialsPlaceholder({
  showTitle = true,
  className = "",
}: TestimonialsPlaceholderProps) {
  return (
    <div className={`shell max-w-4xl ${className}`}>
      {showTitle && (
        <SectionTitle
          eyebrow="Depoimentos Reais"
          title="O que dizem os nossos clientes"
          subtitle="Histórias de proprietários, investidores e inquilinos que confiam no nosso trabalho."
          align="center"
        />
      )}

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
  );
}
