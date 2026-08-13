import { ShieldCheck, Eye, UserCheck, Award, Heart } from "lucide-react";

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: ShieldCheck,
    title: "Confiança e Segurança",
    description: "Cada contrato e negociação é conduzido com o máximo rigor jurídico e transparência documental para garantir a tranquilidade do proprietário e do morador.",
  },
  {
    icon: Eye,
    title: "Transparência Total",
    description: "Informações objetivas sobre valores, taxas, prestação de contas e vistorias sem surpresas ou entrelinhas.",
  },
  {
    icon: UserCheck,
    title: "Atendimento Humano",
    description: "Uma empresa familiar onde você fala com pessoas reais que conhecem cada detalhe do seu imóvel e compreendem suas necessidades.",
  },
  {
    icon: Award,
    title: "Experiência Regional",
    description: "Mais de três décadas de conhecimento profundo sobre a dinâmica imobiliária de Balneário Camboriú e Camboriú.",
  },
  {
    icon: Heart,
    title: "Compromisso Patrimonial",
    description: "Tratamos o seu imóvel com o mesmo cuidado e zelo com que cuidamos do nosso próprio patrimônio.",
  },
];

export function ValuesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {values.map((v, idx) => {
        const Icon = v.icon;
        return (
          <div
            key={idx}
            className="group rounded-2xl border bg-white p-8 shadow-xs hover:border-[var(--gold-light)] hover:shadow-md transition-all"
          >
            <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--plum)] group-hover:bg-[var(--plum)] group-hover:text-[var(--gold)] transition-colors">
              <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-[var(--plum)] mb-3">
              {v.title}
            </h3>
            <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
              {v.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
