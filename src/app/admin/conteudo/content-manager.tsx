"use client";

import { LoaderCircle, Save } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

type Settings = {
  brandName: string;
  tagline: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  instagramUrl: string | null;
  creci: string;
};

type Page = {
  slug: string;
  navigationLabel: string;
  eyebrow: string | null;
  title: string;
  heading: string;
  intro: string | null;
  body: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  isPublished: boolean;
  sortOrder: number;
};

type ContentResponse = { settings: Settings | null; pages: Page[] };

function emptyToNull(value: string) {
  const trimmed = value.trim();
  return trimmed || null;
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  type?: "text" | "email" | "url";
}) {
  return (
    <label className="grid gap-1 text-sm font-bold text-[var(--plum)]">
      {label}
      <input
        className="rounded-lg border bg-white px-3 py-2 font-normal text-[var(--ink)]"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value ?? ""}
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-1 text-sm font-bold text-[var(--plum)]">
      {label}
      <textarea
        className="rounded-lg border bg-white px-3 py-2 font-normal leading-6 text-[var(--ink)]"
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        value={value ?? ""}
      />
    </label>
  );
}

export function ContentManager() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/conteudo", {
        cache: "no-store",
      });
      if (!response.ok)
        throw new Error("Não foi possível carregar o conteúdo.");
      const data = (await response.json()) as ContentResponse;
      setSettings(data.settings);
      setPages(data.pages);
      if (!data.pages.some((page) => page.slug === selectedSlug))
        setSelectedSlug(data.pages[0]?.slug ?? "");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  }, [selectedSlug]);

  useEffect(() => {
    load();
  }, [load]);

  const selectedPage = pages.find((page) => page.slug === selectedSlug) ?? null;

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings) return;
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/conteudo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "settings", settings }),
      });
      if (!response.ok)
        throw new Error("Não foi possível salvar as configurações.");
      setMessage(
        "Configurações salvas. O rodapé e os contatos do site serão atualizados.",
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
    } finally {
      setSaving(false);
    }
  }

  async function savePage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPage) return;
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/conteudo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "page", page: selectedPage }),
      });
      if (!response.ok) throw new Error("Não foi possível salvar a página.");
      setMessage(`Página “${selectedPage.navigationLabel}” salva com sucesso.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
    } finally {
      setSaving(false);
    }
  }

  function patchPage(patch: Partial<Page>) {
    setPages((current) =>
      current.map((page) =>
        page.slug === selectedSlug ? { ...page, ...patch } : page,
      ),
    );
  }

  if (loading)
    return (
      <main className="grid min-h-[50vh] place-items-center">
        <p className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
          <LoaderCircle className="animate-spin" size={18} /> Carregando
          conteúdo…
        </p>
      </main>
    );

  return (
    <main className="p-6 sm:p-10">
      <p className="eyebrow">CMS Corretora Val</p>
      <h1 className="display mt-3 text-4xl text-[var(--plum)] sm:text-5xl">
        Páginas e conteúdo
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">
        Edite o que aparece no site público, incluindo textos, chamadas, SEO e
        canais de atendimento.
      </p>

      <section className="mt-9 grid gap-7 xl:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="rounded-2xl border bg-[var(--surface)] p-3 shadow-[0_8px_22px_rgba(53,16,79,0.05)]">
          <p className="px-3 py-2 text-xs font-extrabold tracking-[0.12em] text-[var(--gold)] uppercase">
            Páginas
          </p>
          {pages.map((page) => (
            <button
              className={`interactive w-full rounded-xl px-3 py-3 text-left text-sm font-bold ${page.slug === selectedSlug ? "bg-[var(--plum)] text-white" : "text-[var(--plum)] hover:bg-[var(--surface-muted)]"}`}
              key={page.slug}
              onClick={() => setSelectedSlug(page.slug)}
              type="button"
            >
              {page.navigationLabel}
            </button>
          ))}
        </aside>

        {selectedPage && (
          <form
            className="rounded-2xl border bg-[var(--surface)] p-5 shadow-[0_8px_22px_rgba(53,16,79,0.05)] sm:p-7"
            onSubmit={savePage}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="display text-3xl text-[var(--plum)]">
                  Editar {selectedPage.navigationLabel}
                </h2>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  /{selectedPage.slug === "home" ? "" : selectedPage.slug}
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm font-bold">
                <input
                  checked={selectedPage.isPublished}
                  onChange={(event) =>
                    patchPage({ isPublished: event.target.checked })
                  }
                  type="checkbox"
                />{" "}
                Publicada
              </label>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Input
                label="Nome no painel"
                value={selectedPage.navigationLabel}
                onChange={(value) => patchPage({ navigationLabel: value })}
              />
              <Input
                label="Texto de apoio"
                value={selectedPage.eyebrow}
                onChange={(value) => patchPage({ eyebrow: emptyToNull(value) })}
              />
              <div className="md:col-span-2">
                <Input
                  label="Título da página"
                  value={selectedPage.title}
                  onChange={(value) => patchPage({ title: value })}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label="Título principal"
                  value={selectedPage.heading}
                  onChange={(value) => patchPage({ heading: value })}
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label="Introdução"
                  value={selectedPage.intro}
                  onChange={(value) => patchPage({ intro: emptyToNull(value) })}
                />
              </div>
              <div className="md:col-span-2">
                <Textarea
                  label="Conteúdo"
                  value={selectedPage.body}
                  onChange={(value) => patchPage({ body: emptyToNull(value) })}
                  rows={7}
                />
              </div>
              <Input
                label="Texto do botão"
                value={selectedPage.ctaLabel}
                onChange={(value) =>
                  patchPage({ ctaLabel: emptyToNull(value) })
                }
              />
              <Input
                label="Destino do botão"
                value={selectedPage.ctaHref}
                onChange={(value) => patchPage({ ctaHref: emptyToNull(value) })}
              />
              <Input
                label="Título SEO"
                value={selectedPage.seoTitle}
                onChange={(value) =>
                  patchPage({ seoTitle: emptyToNull(value) })
                }
              />
              <Textarea
                label="Descrição SEO"
                value={selectedPage.seoDescription}
                onChange={(value) =>
                  patchPage({ seoDescription: emptyToNull(value) })
                }
                rows={2}
              />
            </div>
            <button
              className="interactive mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-5 py-3 text-sm font-extrabold text-white hover:bg-[var(--plum-bright)] disabled:opacity-60"
              disabled={saving}
              type="submit"
            >
              <Save size={17} /> {saving ? "Salvando…" : "Salvar página"}
            </button>
          </form>
        )}
      </section>

      {settings && (
        <section
          className="mt-10 rounded-2xl border bg-[var(--surface)] p-5 shadow-[0_8px_22px_rgba(53,16,79,0.05)] sm:p-7"
          id="configuracoes"
        >
          <p className="eyebrow">Dados globais</p>
          <h2 className="display mt-2 text-3xl text-[var(--plum)]">
            Configurações do site
          </h2>
          <form
            className="mt-6 grid gap-4 md:grid-cols-2"
            onSubmit={saveSettings}
          >
            <Input
              label="Nome da marca"
              value={settings.brandName}
              onChange={(value) =>
                setSettings({ ...settings, brandName: value })
              }
            />
            <Input
              label="Slogan"
              value={settings.tagline}
              onChange={(value) => setSettings({ ...settings, tagline: value })}
            />
            <Input
              label="Telefone"
              value={settings.phone}
              onChange={(value) =>
                setSettings({ ...settings, phone: emptyToNull(value) })
              }
            />
            <Input
              label="WhatsApp (somente números)"
              value={settings.whatsapp}
              onChange={(value) =>
                setSettings({ ...settings, whatsapp: emptyToNull(value) })
              }
            />
            <Input
              label="E-mail"
              type="email"
              value={settings.email}
              onChange={(value) =>
                setSettings({ ...settings, email: emptyToNull(value) })
              }
            />
            <Input
              label="CRECI"
              value={settings.creci}
              onChange={(value) => setSettings({ ...settings, creci: value })}
            />
            <Input
              label="Endereço"
              value={settings.address}
              onChange={(value) =>
                setSettings({ ...settings, address: emptyToNull(value) })
              }
            />
            <Input
              label="Instagram"
              type="url"
              value={settings.instagramUrl}
              onChange={(value) =>
                setSettings({ ...settings, instagramUrl: emptyToNull(value) })
              }
            />
            <button
              className="interactive md:col-span-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-extrabold text-[var(--plum)] hover:bg-[var(--gold-light)] disabled:opacity-60"
              disabled={saving}
              type="submit"
            >
              <Save size={17} /> {saving ? "Salvando…" : "Salvar configurações"}
            </button>
          </form>
        </section>
      )}
      {message && (
        <p
          className="mt-5 rounded-xl border bg-[var(--surface)] p-4 text-sm text-[var(--plum)]"
          role="status"
        >
          {message}
        </p>
      )}
    </main>
  );
}
