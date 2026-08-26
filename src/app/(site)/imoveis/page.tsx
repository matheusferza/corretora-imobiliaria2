export const revalidate = 30; // revalidate every 30s to keep public list reasonably fresh

import { PropertyCard } from "@/components/property-card";
import { prisma } from "@/lib/prisma";

type PublicProperty = {
  id: string;
  slug?: string;
  title: string;
  location: string;
  price: number | null;
  propertyType?: string | null;
  bedrooms?: number | null;
  parkingSpaces?: number | null;
  privateArea?: number | null;
  isFeatured?: boolean;
};

async function loadProperties(): Promise<PublicProperty[]> {
  try {
    const rows = await prisma.imovel.findMany({
      where: { archivedAt: null },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: 50,
      select: {
        id: true,
        slug: true,
        title: true,
        city: true,
        neighborhood: true,
        propertyType: true,
        salePrice: true,
        monthlyRent: true,
        dailyRate: true,
        bedrooms: true,
        parkingSpaces: true,
        privateArea: true,
        isFeatured: true,
      },
    });

    return rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      location: r.neighborhood ? `${r.neighborhood}, ${r.city}` : r.city,
      price: r.salePrice ?? r.monthlyRent ?? r.dailyRate ?? null,
      propertyType: r.propertyType,
      bedrooms: r.bedrooms,
      parkingSpaces: r.parkingSpaces,
      privateArea: r.privateArea,
      isFeatured: r.isFeatured,
    }));
  } catch {
    return [];
  }
}

export default async function Imoveis() {
  const properties = await loadProperties();

  return (
    <main className="shell py-12">
      <div className="max-w-4xl">
        <h1 className="display text-4xl text-[var(--plum)]">Imóveis</h1>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Conheça alguns imóveis selecionados pela Corretora Val.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.length === 0 ? (
          <p className="text-sm text-[var(--ink-soft)]">
            Nenhum imóvel disponível no momento. Volte mais tarde ou entre em
            contato conosco.
          </p>
        ) : (
          properties.map((p) => <PropertyCard key={p.id} property={p} />)
        )}
      </div>
    </main>
  );
}
