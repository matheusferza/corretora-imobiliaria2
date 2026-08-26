"use client";

import { LoaderCircle, Save } from "lucide-react";
import { type FormEvent, useCallback, useEffect, useState } from "react";

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

export function SettingsManager() {
  const [settings, setSettings] = useState<Settings | null>(null);
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
        throw new Error("Não foi possível carregar as configurações.");
      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocorreu um erro.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

  if (loading)
    return (
      <main className="grid min-h-[50vh] place-items-center">
        <p className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
          <LoaderCircle className="animate-spin" size={18} /> Carregando
          configurações…
        </p>
      </main>
    );

  return (
    <main className="p-6 sm:p-10">
      <p className="eyebrow">Configurações</p>
      <h1 className="display mt-3 text-4xl text-[var(--plum)] sm:text-5xl">
        Configurações do site
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">
        Edite as configurações globais do site, exibidas no cabeçalho e rodapé
        público.
      </p>

      <section className="mt-9">
        {settings ? (
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
        ) : (
          <p className="text-sm text-[var(--ink-soft)]">
            Nenhuma configuração encontrada.
          </p>
        )}

        {message && (
          <p
            className="mt-5 rounded-xl border bg-[var(--surface)] p-4 text-sm text-[var(--plum)]"
            role="status"
          >
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
