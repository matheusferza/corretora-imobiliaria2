import {
  Award,
  Eye,
  Heart,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: ShieldCheck,
    title: "Honestidade",
    description: "Honestidade acima de qualquer negociação.",
  },
  {
    icon: Heart,
    title: "Respeito",
    description: "Respeito às pessoas e ao patrimônio de cada cliente.",
  },
  {
    icon: Eye,
    title: "Transparência",
    description: "Transparência em todas as etapas.",
  },
  {
    icon: Award,
    title: "Organização & Excelência",
    description: "Organização e compromisso com a excelência.",
  },
  {
    icon: UserCheck,
    title: "Atendimento Humano",
    description: "Atendimento humano e personalizado.",
  },
  {
    icon: Sparkles,
    title: "Inovação",
    description: "Aprendizado contínuo e inovação.",
  },
];

export function ValuesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {values.map((v) => {
        const Icon = v.icon;
        return (
          <div
            key={v.title}
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
