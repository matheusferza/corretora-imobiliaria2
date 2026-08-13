import { Calendar, MapPin, Award, Building, HeartHandshake } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  location?: string;
  tag?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "1990",
    title: "Fundação da Corretora Val",
    description: "Início das atividades em Balneário Camboriú, fundada por Val com foco em atendimento personalizado e gestão responsável de imóveis familiares.",
    location: "Balneário Camboriú — SC",
    tag: "Origem",
  },
  {
    year: "1998",
    title: "Expansão para Camboriú",
    description: "Consolidação da atuação regional na gestão e locação anual de casas e apartamentos em Balneário Camboriú e Camboriú.",
    location: "Região de Camboriú",
    tag: "Crescimento",
  },
  {
    year: "2010",
    title: "Marca de 300+ Imóveis Administrados",
    description: "Conquista de uma base sólida de proprietários fiéis que confiam na administração integral de seus patrimônios.",
    tag: "Reconhecimento",
  },
  {
    year: "2020",
    title: "30 Anos de Tradição e Renovação Digital",
    description: "Modernização dos processos com atendimento digital via WhatsApp e garantias contratuais ágeis sem perca do toque humano familiar.",
    tag: "Inovação",
  },
  {
    year: "2026",
    title: "Plataforma Digital e Novo Padrão de Atendimento",
    description: "Lançamento do portal exclusivo Corretora Val, unindo transparência total, busca avançada de imóveis e captação simplificada.",
    tag: "Atualidade",
  },
];

export function Timeline() {
  return (
    <div className="relative border-l-2 border-[var(--gold-light)] pl-6 ml-4 md:ml-8 md:pl-10 space-y-12">
      {timelineData.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Timeline Dot */}
          <div className="absolute -left-[31px] md:-left-[47px] top-1.5 flex size-8 items-center justify-center rounded-full border-2 border-[var(--gold)] bg-white text-[var(--plum)] shadow-md group-hover:bg-[var(--plum)] group-hover:text-[var(--gold)] transition-colors">
            <Calendar size={14} />
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
      ))}
    </div>
  );
}
