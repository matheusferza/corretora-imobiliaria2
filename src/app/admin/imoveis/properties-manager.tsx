"use client";

import { formatPrice } from "@/lib/format-price";
import { Archive, LoaderCircle, Plus, RefreshCw } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

type Purpose = "VENDA" | "LOCACAO_ANUAL" | "TEMPORADA";

type Property = {
  id: string;
  code: string;
  title: string;
  propertyType: string;
  purpose: Purpose;
  status: string;
  city: string;
  salePrice: number | null;
  monthlyRent: number | null;
  dailyRate: number | null;
  isFeatured: boolean;
};

type Draft = {
  code: string;
  slug: string;
  title: string;
  propertyType: string;
  purpose: Purpose;
  city: string;
  price: string;
  isFeatured: boolean;
};

const initialDraft: Draft = {
  code: "",
  slug: "",
  title: "",
  propertyType: "Apartamento",
  purpose: "VENDA",
  city: "Balneário Camboriú",
  price: "",
  isFeatured: false,
};

function priceFor(property: Property) {
  return property.salePrice ?? property.monthlyRent ?? property.dailyRate;
}

function labelFor(purpose: Purpose) {
  if (purpose === "LOCACAO_ANUAL") return "Aluguel mensal";
  if (purpose === "TEMPORADA") return "Diária";
  return "Valor de venda";
}

function toSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function AdminPropertiesManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [draft, setDraft] = useState<Draft>(initialDraft);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadProperties = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("/api/imoveis", { cache: "no-store" });
      if (!response.ok)
        throw new Error("Não foi possível carregar os imóveis.");
      setProperties(await response.json());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  async function createProperty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const price = Number(draft.price);
    const payload = {
      code: draft.code.trim().toUpperCase(),
      slug: draft.slug || toSlug(draft.title),
      title: draft.title,
      propertyType: draft.propertyType,
      purpose: draft.purpose,
      city: draft.city,
      isFeatured: draft.isFeatured,
      ...(draft.purpose === "VENDA" ? { salePrice: price } : {}),
      ...(draft.purpose === "LOCACAO_ANUAL" ? { monthlyRent: price } : {}),
      ...(draft.purpose === "TEMPORADA" ? { dailyRate: price } : {}),
    };

    try {
      const response = await fetch("/api/imoveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Revise os dados do imóvel.",
        );
      }

      setDraft(initialDraft);
      setMessage("Imóvel cadastrado com sucesso.");
      await loadProperties();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
    } finally {
      setSubmitting(false);
    }
  }

  async function archiveProperty(id: string) {
    if (
      !window.confirm(
        "Arquivar este imóvel? Ele deixará de aparecer no site público.",
      )
    ) {
      return;
    }

    setMessage(null);
    const response = await fetch(`/api/imoveis?id=${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Não foi possível arquivar o imóvel.");
      return;
    }

    setMessage("Imóvel arquivado.");
    await loadProperties();
  }

  return (
    <main className="shell py-12 sm:py-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Painel Corretora Val</p>
          <h1 className="display mt-3 text-4xl text-[var(--plum)] sm:text-5xl">
            Imóveis
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">
            Cadastre imóveis e mantenha o catálogo público atualizado com
            autonomia.
          </p>
        </div>
        <button
          className="interactive inline-flex items-center justify-center gap-2 rounded-full border bg-[var(--surface)] px-5 py-3 text-sm font-bold text-[var(--plum)] hover:border-[var(--gold)]"
          disabled={loading}
          onClick={loadProperties}
          type="button"
        >
          <RefreshCw aria-hidden="true" size={16} /> Atualizar lista
        </button>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)]">
        <div className="rounded-2xl border bg-[var(--surface)] p-5 shadow-[0_8px_24px_rgba(53,16,79,0.06)] sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display text-3xl text-[var(--plum)]">
              Catálogo ativo
            </h2>
            <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-bold text-[var(--ink-soft)]">
              {properties.length} imóveis
            </span>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 py-10 text-sm text-[var(--ink-soft)]">
              <LoaderCircle className="animate-spin" size={18} /> Carregando
              imóveis…
            </div>
          ) : properties.length === 0 ? (
            <p className="py-10 text-sm text-[var(--ink-soft)]">
              Nenhum imóvel ativo. Cadastre o primeiro usando o formulário ao
              lado.
            </p>
          ) : (
            <ul className="mt-5 divide-y">
              {properties.map((property) => {
                const price = priceFor(property);
                return (
                  <li
                    className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                    key={property.id}
                  >
                    <div>
                      <p className="text-xs font-extrabold tracking-[0.1em] text-[var(--gold)] uppercase">
                        {property.code} ·{" "}
                        {property.purpose.replaceAll("_", " ")}
                      </p>
                      <h3 className="mt-1 font-bold text-[var(--plum)]">
                        {property.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">
                        {property.propertyType} · {property.city}
                        {price != null ? ` · ${formatPrice(price)}` : ""}
                      </p>
                    </div>
                    <button
                      className="interactive inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-bold text-[var(--plum)] hover:border-red-400 hover:text-red-700"
                      onClick={() => archiveProperty(property.id)}
                      type="button"
                    >
                      <Archive aria-hidden="true" size={15} /> Arquivar
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <section className="rounded-2xl bg-[var(--plum)] p-6 text-white shadow-[0_12px_34px_rgba(53,16,79,0.2)] sm:p-8">
          <p className="eyebrow text-[var(--gold-light)]">Novo cadastro</p>
          <h2 className="display mt-3 text-3xl">Adicionar imóvel</h2>
          <form className="mt-6 grid gap-4" onSubmit={createProperty}>
            <label className="grid gap-1 text-sm font-bold">
              Código do imóvel
              <input
                className="rounded-lg border-0 bg-white px-3 py-2 text-[var(--ink)]"
                minLength={3}
                onChange={(event) =>
                  setDraft({ ...draft, code: event.target.value })
                }
                required
                value={draft.code}
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Título
              <input
                className="rounded-lg border-0 bg-white px-3 py-2 text-[var(--ink)]"
                minLength={3}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    title: event.target.value,
                    slug: draft.slug || toSlug(event.target.value),
                  })
                }
                required
                value={draft.title}
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              URL amigável
              <input
                className="rounded-lg border-0 bg-white px-3 py-2 text-[var(--ink)]"
                onChange={(event) =>
                  setDraft({ ...draft, slug: toSlug(event.target.value) })
                }
                required
                value={draft.slug}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-bold">
                Finalidade
                <select
                  className="rounded-lg border-0 bg-white px-3 py-2 text-[var(--ink)]"
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      purpose: event.target.value as Purpose,
                    })
                  }
                  value={draft.purpose}
                >
                  <option value="VENDA">Venda</option>
                  <option value="LOCACAO_ANUAL">Locação anual</option>
                  <option value="TEMPORADA">Temporada</option>
                </select>
              </label>
              <label className="grid gap-1 text-sm font-bold">
                Tipo
                <input
                  className="rounded-lg border-0 bg-white px-3 py-2 text-[var(--ink)]"
                  onChange={(event) =>
                    setDraft({ ...draft, propertyType: event.target.value })
                  }
                  required
                  value={draft.propertyType}
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-bold">
                Cidade
                <input
                  className="rounded-lg border-0 bg-white px-3 py-2 text-[var(--ink)]"
                  onChange={(event) =>
                    setDraft({ ...draft, city: event.target.value })
                  }
                  required
                  value={draft.city}
                />
              </label>
              <label className="grid gap-1 text-sm font-bold">
                {labelFor(draft.purpose)} (R$)
                <input
                  className="rounded-lg border-0 bg-white px-3 py-2 text-[var(--ink)]"
                  min="0"
                  onChange={(event) =>
                    setDraft({ ...draft, price: event.target.value })
                  }
                  required
                  type="number"
                  value={draft.price}
                />
              </label>
            </div>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input
                checked={draft.isFeatured}
                onChange={(event) =>
                  setDraft({ ...draft, isFeatured: event.target.checked })
                }
                type="checkbox"
              />
              Exibir como destaque na Home
            </label>
            <button
              className="interactive mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-extrabold text-[var(--plum)] hover:bg-[var(--gold-light)] disabled:cursor-wait disabled:opacity-70"
              disabled={submitting}
              type="submit"
            >
              {submitting ? (
                <LoaderCircle className="animate-spin" size={17} />
              ) : (
                <Plus size={17} />
              )}
              {submitting ? "Salvando…" : "Cadastrar imóvel"}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-sm text-white/85" role="status">
              {message}
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
