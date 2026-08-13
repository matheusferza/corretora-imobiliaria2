"use client";

import { formatPrice } from "@/lib/format-price";
import {
  Archive,
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";

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

type PhotoEntry = {
  url: string;
  path?: string;
  alt?: string;
  position?: number;
  isCover?: boolean;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    code: string;
    title: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  // Open/close delete confirmation dialog
  useEffect(() => {
    if (deleteTarget) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [deleteTarget]);

  function cancelEdit() {
    setEditingId(null);
    setDraft(initialDraft);
    setPhotos([]);
    setMessage(null);
  }

  async function loadPropertyForEdit(property: Property) {
    setMessage(null);
    // Fetch full record (includes photos)
    try {
      const res = await fetch(`/api/imoveis?id=${property.id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Não foi possível carregar o imóvel.");
      const full = await res.json();
      const price =
        full.salePrice ?? full.monthlyRent ?? full.dailyRate ?? "";
      setDraft({
        code: full.code,
        slug: full.slug,
        title: full.title,
        propertyType: full.propertyType,
        purpose: full.purpose,
        city: full.city,
        price: price !== "" ? String(price) : "",
        isFeatured: full.isFeatured,
      });
      if (Array.isArray(full.photos)) {
        setPhotos(
          full.photos.map((p: any) => ({
            url: p.url,
            path: p.path ?? undefined,
            alt: p.alt ?? undefined,
            isCover: p.isCover,
            position: p.position,
          })),
        );
      }
      setEditingId(property.id);
      // Scroll form panel into view on small screens
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Erro ao carregar imóvel.",
      );
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingId) {
      await updateProperty();
    } else {
      await createProperty();
    }
  }

  async function createProperty() {
    setSubmitting(true);
    setMessage(null);

    const price = Number(draft.price);
    const payload: any = {
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

    if (photos.length > 0) {
      payload.photos = photos.map((p, i) => ({
        url: p.url,
        alt: p.alt ?? null,
        position: i,
        isCover: !!p.isCover,
      }));
    }

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
      setPhotos([]);
      setMessage("Imóvel cadastrado com sucesso.");
      await loadProperties();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
    } finally {
      setSubmitting(false);
    }
  }

  async function updateProperty() {
    if (!editingId) return;
    setSubmitting(true);
    setMessage(null);

    const price = Number(draft.price);
    const payload: any = {
      code: draft.code.trim().toUpperCase(),
      slug: draft.slug || toSlug(draft.title),
      title: draft.title,
      propertyType: draft.propertyType,
      purpose: draft.purpose,
      city: draft.city,
      isFeatured: draft.isFeatured,
      salePrice: draft.purpose === "VENDA" ? price : null,
      monthlyRent: draft.purpose === "LOCACAO_ANUAL" ? price : null,
      dailyRate: draft.purpose === "TEMPORADA" ? price : null,
    };

    try {
      const response = await fetch(`/api/imoveis?id=${editingId}`, {
        method: "PUT",
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

      setMessage(`Imóvel ${draft.code} atualizado com sucesso.`);
      setEditingId(null);
      setDraft(initialDraft);
      setPhotos([]);
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

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/imoveis/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Não foi possível excluir o imóvel.");
      }
      setMessage(`Imóvel ${deleteTarget.code} excluído permanentemente.`);
      setDeleteTarget(null);
      await loadProperties();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  const isEditing = editingId !== null;
  const editingCode = isEditing
    ? properties.find((p) => p.id === editingId)?.code ?? "imóvel"
    : null;

  return (
    <main className="shell py-12 sm:py-16" style={{ minHeight: "100dvh" }}>
      {/* ── Header ─────────────────────────────────────── */}
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

      {/* ── Two-column grid: list + form ───────────────── */}
      <section className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)]">

        {/* Property list */}
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
                const isBeingEdited = editingId === property.id;
                return (
                  <li
                    className={`flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between${isBeingEdited ? " bg-[var(--surface-muted)] -mx-2 px-2 rounded-xl" : ""}`}
                    key={property.id}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold tracking-[0.1em] text-[var(--gold)] uppercase">
                        {property.code} ·{" "}
                        {property.purpose.replaceAll("_", " ")}
                        {isBeingEdited && (
                          <span className="ml-2 rounded bg-[var(--gold)] px-1.5 py-0.5 text-[10px] text-[var(--plum)]">
                            editando
                          </span>
                        )}
                      </p>
                      <h3 className="mt-1 truncate font-bold text-[var(--plum)]">
                        {property.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--ink-soft)]">
                        {property.propertyType} · {property.city}
                        {price != null ? ` · ${formatPrice(price)}` : ""}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {/* Edit */}
                      <button
                        className="interactive inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--plum)]/20 px-4 py-2 text-sm font-bold text-[var(--plum)] hover:border-[var(--plum)] hover:bg-[var(--plum)]/5"
                        onClick={() =>
                          isBeingEdited
                            ? cancelEdit()
                            : loadPropertyForEdit(property)
                        }
                        type="button"
                      >
                        {isBeingEdited ? (
                          <>
                            <X aria-hidden="true" size={14} /> Cancelar
                          </>
                        ) : (
                          <>
                            <Pencil aria-hidden="true" size={14} /> Editar
                          </>
                        )}
                      </button>

                      {/* Archive */}
                      <button
                        className="interactive inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold text-[var(--plum)] hover:border-amber-400 hover:text-amber-700"
                        onClick={() => archiveProperty(property.id)}
                        type="button"
                      >
                        <Archive aria-hidden="true" size={14} /> Arquivar
                      </button>

                      {/* Delete */}
                      <button
                        className="interactive inline-flex items-center justify-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:border-red-500 hover:bg-red-50"
                        onClick={() =>
                          setDeleteTarget({
                            id: property.id,
                            code: property.code,
                            title: property.title,
                          })
                        }
                        type="button"
                      >
                        <Trash2 aria-hidden="true" size={14} /> Excluir
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Form panel */}
        <section
          ref={formRef}
          className="rounded-2xl bg-[var(--plum)] p-6 text-white shadow-[0_12px_34px_rgba(53,16,79,0.2)] sm:p-8 self-start"
        >
          {isEditing ? (
            <>
              <p className="eyebrow text-[var(--gold-light)]">Edição</p>
              <h2 className="display mt-3 text-3xl">
                Editando{" "}
                <span className="text-[var(--gold-light)]">{editingCode}</span>
              </h2>
            </>
          ) : (
            <>
              <p className="eyebrow text-[var(--gold-light)]">Novo cadastro</p>
              <h2 className="display mt-3 text-3xl">Adicionar imóvel</h2>
            </>
          )}

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
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

            {/* Upload */}
            <div className="grid gap-2">
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={async (e) => {
                    const files = Array.from(e.currentTarget.files || []);
                    if (files.length === 0) return;
                    setMessage("Enviando imagens...");
                    try {
                      for (const f of files) {
                        const form = new FormData();
                        form.append("file", f, f.name);
                        const resp = await fetch("/api/uploads", {
                          method: "POST",
                          body: form,
                        });
                        const body = await resp.json();
                        if (!resp.ok)
                          throw new Error(body.error || "Upload falhou");
                        setPhotos((prev) => [
                          ...prev,
                          { url: body.url, path: body.path },
                        ]);
                      }
                    } catch (err) {
                      setMessage(
                        err instanceof Error ? err.message : "Erro no upload",
                      );
                    } finally {
                      setMessage(null);
                    }
                  }}
                />
                <label
                  htmlFor="photos"
                  className="interactive inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border bg-[var(--surface)] px-5 py-3 text-sm font-bold text-[var(--plum)] hover:border-[var(--gold)]"
                >
                  Selecionar imagens
                </label>
                <span className="text-sm text-white/75">
                  Até 12 imagens.
                </span>
              </div>
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((p, idx) => (
                    <div
                      key={idx}
                      className="relative h-16 w-24 overflow-hidden rounded bg-white"
                    >
                      <img
                        src={p.url}
                        alt={p.alt || `Foto ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPhotos((s) => s.filter((_, i) => i !== idx))
                        }
                        className="absolute right-1 top-1 rounded-full bg-white/80 px-1 text-xs"
                      >
                        ✕
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPhotos((s) =>
                            s.map((it, i) => ({ ...it, isCover: i === idx })),
                          )
                        }
                        className="absolute bottom-1 left-1 rounded-full bg-white/80 px-1 text-xs"
                      >
                        Capa
                      </button>
                      {p.isCover && (
                        <span className="absolute bottom-1 right-1 rounded-full bg-[var(--gold)] px-1 text-[10px] font-bold text-[var(--plum)]">
                          ✓
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit / Cancel row */}
            <div className="mt-2 flex flex-wrap gap-3">
              <button
                className="interactive inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-extrabold text-[var(--plum)] hover:bg-[var(--gold-light)] disabled:cursor-wait disabled:opacity-70"
                disabled={submitting}
                type="submit"
              >
                {submitting ? (
                  <LoaderCircle className="animate-spin" size={17} />
                ) : isEditing ? (
                  <Pencil size={17} />
                ) : (
                  <Plus size={17} />
                )}
                {submitting
                  ? "Salvando…"
                  : isEditing
                    ? "Salvar alterações"
                    : "Cadastrar imóvel"}
              </button>
              {isEditing && (
                <button
                  className="interactive inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white/80 hover:border-white hover:text-white"
                  onClick={cancelEdit}
                  type="button"
                >
                  <X size={15} /> Cancelar edição
                </button>
              )}
            </div>
          </form>

          {message && (
            <p className="mt-4 text-sm text-white/85" role="status">
              {message}
            </p>
          )}
        </section>
      </section>

      {/* ── Hard Delete Confirmation Dialog ────────────── */}
      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded-2xl p-0 shadow-2xl backdrop:bg-black/50"
        onCancel={() => setDeleteTarget(null)}
      >
        <div className="p-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Trash2 aria-hidden="true" className="text-red-600" size={22} />
          </div>
          <h2 className="text-xl font-extrabold text-[var(--plum)]">
            Excluir imóvel permanentemente?
          </h2>
          {deleteTarget && (
            <p className="mt-3 text-sm text-[var(--ink-soft)]">
              Você está prestes a excluir{" "}
              <strong className="text-[var(--ink)]">
                {deleteTarget.code} — {deleteTarget.title}
              </strong>
              . Esta ação <strong>não pode ser desfeita</strong> e removerá o
              registro e todas as fotos associadas permanentemente.
            </p>
          )}
          <div className="mt-6 flex flex-wrap-reverse gap-3">
            <button
              autoFocus
              className="interactive flex-1 rounded-full border px-5 py-3 text-sm font-bold text-[var(--plum)] hover:border-[var(--plum)]"
              onClick={() => setDeleteTarget(null)}
              type="button"
            >
              Cancelar
            </button>
            <button
              className="interactive inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-red-700 disabled:cursor-wait disabled:opacity-70"
              disabled={deleting}
              onClick={confirmDelete}
              type="button"
            >
              {deleting ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                <Trash2 size={16} />
              )}
              {deleting ? "Excluindo…" : "Sim, excluir"}
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
}
