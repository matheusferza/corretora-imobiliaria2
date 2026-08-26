import { ArrowRight, Bed, Car, Maximize2 } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";

export interface PropertyCardProps {
  property: {
    id: string;
    code?: string;
    slug?: string;
    title: string;
    location: string;
    price: number | null;
    propertyType?: string | null;
    bedrooms?: number | null;
    suites?: number | null;
    bathrooms?: number | null;
    parkingSpaces?: number | null;
    privateArea?: number | null;
    isFeatured?: boolean;
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  // NOTE: rota dinâmica /imoveis/[slug] é parte da Fase 2 do roadmap.
  // Até sua criação, os cards direcionam com segurança para o catálogo geral /imoveis.
  const href = "/imoveis";

  return (
    <article className="group flex flex-col justify-between rounded-2xl border bg-[var(--background)] p-5 shadow-[0_2px_8px_rgba(53,16,79,0.04)] hover:border-[var(--gold-light)] hover:shadow-md transition-all">
      <div>
        <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--plum)] to-[var(--plum-bright)]/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(216,189,130,0.2),transparent_50%)]" />
          {property.isFeatured && (
            <span className="absolute top-3 left-3 rounded-full bg-[var(--gold)] px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider text-[var(--plum)] shadow-xs">
              Destaque
            </span>
          )}
          {property.propertyType && (
            <span className="absolute top-3 right-3 rounded-full bg-black/40 px-2.5 py-0.5 text-[0.65rem] font-bold text-white backdrop-blur-xs">
              {property.propertyType}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-bold text-[var(--plum)] group-hover:text-[var(--plum-bright)] transition-colors line-clamp-1">
          {property.title}
        </h3>
        <p className="text-xs text-[var(--ink-soft)] mt-1 line-clamp-1">
          {property.location}
        </p>

        {(property.bedrooms ||
          property.parkingSpaces ||
          property.privateArea) && (
          <div className="mt-3 flex items-center gap-3 border-t pt-3 text-xs text-[var(--ink-soft)]">
            {property.bedrooms ? (
              <span className="flex items-center gap-1">
                <Bed size={14} className="text-[var(--gold)]" />
                {property.bedrooms} qts
              </span>
            ) : null}
            {property.parkingSpaces ? (
              <span className="flex items-center gap-1">
                <Car size={14} className="text-[var(--gold)]" />
                {property.parkingSpaces} vg
              </span>
            ) : null}
            {property.privateArea ? (
              <span className="flex items-center gap-1">
                <Maximize2 size={13} className="text-[var(--gold)]" />
                {property.privateArea} m²
              </span>
            ) : null}
          </div>
        )}
      </div>

      <div className="mt-4 border-t pt-3 flex items-center justify-between">
        <div>
          <span className="block text-[0.65rem] font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            Valor
          </span>
          <p className="text-base font-extrabold text-[var(--plum)]">
            {property.price != null
              ? formatPrice(property.price)
              : "Sob consulta"}
          </p>
        </div>

        <Link
          href={href}
          className="interactive inline-flex items-center gap-1 rounded-full bg-[var(--plum)] px-4 py-2 text-xs font-bold text-white hover:bg-[var(--plum-bright)] transition-colors"
        >
          Ver detalhes <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
