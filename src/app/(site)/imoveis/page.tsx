export const revalidate = 30; // revalidate every 30s to keep public list reasonably fresh

import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import { prisma } from "@/lib/prisma";

type PublicProperty = {
  id: string;
  title: string;
  location: string;
  price: number | null;
};

async function loadProperties(): Promise<PublicProperty[]> {
  const rows = await prisma.imovel.findMany({
    where: { archivedAt: null },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 50,
    select: {
      id: true,
      title: true,
      city: true,
      salePrice: true,
      monthlyRent: true,
      dailyRate: true,
    },
  });

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    location: r.city,
    price: r.salePrice ?? r.monthlyRent ?? r.dailyRate ?? null,
  }));
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
          properties.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border bg-[var(--background)] p-4 shadow-[0_2px_8px_rgba(53,16,79,0.04)]"
            >
              <div className="h-36 w-full rounded-md bg-gradient-to-br from-[var(--plum)] to-[var(--plum-bright)]/30" />
              <h2 className="mt-4 text-lg font-bold text-[var(--plum)]">
                {p.title}
              </h2>
              <p className="text-sm text-[var(--ink-soft)]">{p.location}</p>
              <p className="mt-3 text-base font-extrabold">
                {p.price != null ? formatPrice(p.price) : "Sob consulta"}
              </p>
              <div className="mt-4">
                <Link
                  href={`#/`}
                  className="inline-flex items-center rounded-full bg-[var(--plum)] px-4 py-2 text-sm font-bold text-white"
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
