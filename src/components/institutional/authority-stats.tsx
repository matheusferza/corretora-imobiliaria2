import { CheckCircle2, Shield } from "lucide-react";

export function AuthorityStats() {
  return (
    <div className="space-y-12">
      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 text-center shadow-xs">
          <span className="display block text-4xl font-bold text-[var(--plum)]">
            35+
          </span>
          <span className="mt-2 block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            Anos no Mercado
          </span>
        </div>
        <div className="rounded-2xl border bg-white p-6 text-center shadow-xs">
          <span className="display block text-4xl font-bold text-[var(--plum)]">
            100%
          </span>
          <span className="mt-2 block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            Vistorias Detalhadas
          </span>
        </div>
        <div className="rounded-2xl border bg-white p-6 text-center shadow-xs">
          <span className="display block text-4xl font-bold text-[var(--plum)]">
            BC & Camboriú
          </span>
          <span className="mt-2 block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            Atuação Especializada
          </span>
        </div>
        <div className="rounded-2xl border bg-white p-6 text-center shadow-xs">
          <span className="display block text-4xl font-bold text-[var(--plum)]">
            CRECI/SC
          </span>
          <span className="mt-2 block text-xs font-bold text-[var(--gold)] uppercase tracking-wider font-extrabold">
            56372-F
          </span>
        </div>
      </div>

      {/* Trust Factors Card */}
      <div className="rounded-3xl border border-[var(--gold-light)] bg-gradient-to-r from-[var(--surface)] to-[var(--surface-muted)] p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-bold text-[var(--gold)] mb-4">
              <Shield size={16} /> Credibilidade Comprovada
            </div>
            <h3 className="display text-3xl text-[var(--plum)] leading-tight">
              Decisões imobiliárias seguras amparadas por quem conhece cada rua.
            </h3>
            <p className="mt-4 text-sm text-[var(--ink-soft)] leading-relaxed">
              Diferente de grandes plataformas impessoais, na Corretora Val cada
              imóvel é acompanhado de perto por corretores credenciados,
              garantindo avaliação justa, fotos profissionais e filtragem
              rigorosa de interessados.
            </p>
          </div>

          <div className="space-y-4 bg-white p-6 md:p-8 rounded-2xl border shadow-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                className="text-[var(--gold)] shrink-0 mt-0.5"
              />
              <div>
                <h4 className="font-bold text-sm text-[var(--plum)]">
                  Avaliação de Mercado Realista
                </h4>
                <p className="text-xs text-[var(--ink-soft)]">
                  Preço alinhado à realidade local de Balneário Camboriú e
                  Camboriú.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                className="text-[var(--gold)] shrink-0 mt-0.5"
              />
              <div>
                <h4 className="font-bold text-sm text-[var(--plum)]">
                  Análise Rigorosa de Crédito
                </h4>
                <p className="text-xs text-[var(--ink-soft)]">
                  Garantia locatícia pré-aprovada para proteger seu aluguel
                  mensal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2
                size={20}
                className="text-[var(--gold)] shrink-0 mt-0.5"
              />
              <div>
                <h4 className="font-bold text-sm text-[var(--plum)]">
                  Suporte Jurídico e Documental
                </h4>
                <p className="text-xs text-[var(--ink-soft)]">
                  Contratos elaborados dentro das normas vigentes e Lei do
                  Inquilinato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
