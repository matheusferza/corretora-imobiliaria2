import { Calendar, MapPin, Heart, Bike, ShieldCheck, Home } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  location?: string;
  tag?: string;
  icon?: React.ElementType;
}

const timelineData: TimelineItem[] = [
  {
    year: "1990",
    title: "Primeiros Passos na Imobiliária Gonzaga",
    description:
      "Início no mercado imobiliário em Curitiba como secretária, passando pela apresentação de imóveis, realização de vistorias e intermediação entre proprietários e locatários.",
    location: "Curitiba — PR",
    tag: "O Início",
    icon: Home,
  },
  {
    year: "25 Anos",
    title: "Trabalho Honesto & Liderança Social na AMAE",
    description:
      "Dedicação como motoboy durante 25 anos para sustentar a família com dignidade, acumulada com a honra de presidir a AMAE (Associação de Apoio à Criança e ao Adolescente com Mobilidade Reduzida e com Câncer).",
    tag: "Superação & Compromisso",
    icon: Bike,
  },
  {
    year: "2019",
    title: "Recomeço em Balneário Camboriú e Nascimento da Corretora Val",
    description:
      "Retorno ao mercado imobiliário já em Balneário Camboriú, reencontrando a vocação essencial e fundando a Corretora Val.",
    location: "Balneário Camboriú — SC",
    tag: "Recomeço",
    icon: Heart,
  },
  {
    year: "Hoje",
    title: "Tradição Familiar na Administração de Patrimônios",
    description:
      "Gestão completa em família de administração de imóveis, locação anual, temporada e compra e venda, unindo gerações e construindo relacionamentos duradouros.",
    location: "Balneário Camboriú e Camboriú",
    tag: "Atualidade",
    icon: ShieldCheck,
  },
];

export function Timeline() {
  return (
    <div className="relative border-l-2 border-[var(--gold-light)] pl-6 ml-4 md:ml-8 md:pl-10 space-y-12">
      {timelineData.map((item, idx) => {
        const Icon = item.icon || Calendar;
        return (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex size-8 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-white text-[var(--plum)] shadow-md group-hover:bg-[var(--plum)] group-hover:text-[var(--gold)] transition-colors">
              <Icon size={14} />
            </div>

            <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="display text-2xl md:text-3xl font-bold text-[var(--gold)]">
                  {item.year}
                </span>
                {item.tag && (
                  <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[0.65rem] font-extrabold tracking-wider text-[var(--plum)] uppercase">
                    {item.tag}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[var(--plum)] mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {item.description}
              </p>

              {item.location && (
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
                  <MapPin size={13} className="text-[var(--gold)]" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
