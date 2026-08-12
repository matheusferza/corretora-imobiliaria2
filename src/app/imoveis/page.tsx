import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { formatPrice } from '@/lib/format-price';
import Link from 'next/link';

const properties = [
  {
    id: 'p1',
    title: 'Apartamento na Praia Central',
    location: 'Balneário Camboriú',
    price: 1250000,
  },
  {
    id: 'p2',
    title: 'Casa em Camboriú - Jardim',
    location: 'Camboriú',
    price: 850000,
  },
  {
    id: 'p3',
    title: 'Cobertura vista mar',
    location: 'Balneário Camboriú',
    price: 3200000,
  },
];

export default function Imoveis() {
  return (
    <>
      <SiteHeader />
      <main className="shell py-12">
        <div className="max-w-4xl">
          <h1 className="display text-4xl text-[var(--plum)]">Imóveis</h1>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Conheça alguns imóveis selecionados pela Corretora Val.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <article
              key={p.id}
              className="rounded-2xl border bg-[var(--background)] p-4 shadow-[0_2px_8px_rgba(53,16,79,0.04)]"
            >
              <div className="h-36 w-full rounded-md bg-gradient-to-br from-[var(--plum)] to-[var(--plum-bright)]/30" />
              <h2 className="mt-4 text-lg font-bold text-[var(--plum)]">{p.title}</h2>
              <p className="text-sm text-[var(--ink-soft)]">{p.location}</p>
              <p className="mt-3 text-base font-extrabold">{formatPrice(p.price)}</p>
              <div className="mt-4">
                <Link
                  href="#"
                  className="inline-flex items-center rounded-full bg-[var(--plum)] px-4 py-2 text-sm font-bold text-white"
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
