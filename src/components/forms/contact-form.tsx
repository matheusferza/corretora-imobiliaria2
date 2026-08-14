"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      type: "CONTATO",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem.");
      }

      setStatus("success");
      form.reset();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar. Tente novamente.";
      setStatus("error");
      setErrorMessage(message);
    }
  };

  return (
    <div className="rounded-3xl border bg-white p-8 md:p-12 shadow-sm">
      <h3 className="display text-2xl font-bold text-[var(--plum)] mb-2">
        Envie uma Mensagem
      </h3>
      <p className="text-sm text-[var(--ink-soft)] mb-6">
        Preencha o formulário abaixo e nossa equipe responderá com a orientação
        certa para o seu projeto.
      </p>

      {status === "success" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-800">
          <div className="flex items-center gap-3 mb-2 font-bold text-lg">
            <CheckCircle2 size={22} className="text-emerald-600" />
            Mensagem Enviada com Sucesso!
          </div>
          <p className="text-sm text-emerald-700">
            Obrigado pelo contato! Retornaremos sua mensagem o mais breve
            possível.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
          >
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center gap-2">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-bold text-[var(--ink)] uppercase mb-1.5"
            >
              Nome completo *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              placeholder="Seu nome"
              className="w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-hidden"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-email"
                className="block text-xs font-bold text-[var(--ink)] uppercase mb-1.5"
              >
                E-mail *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-hidden"
              />
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="block text-xs font-bold text-[var(--ink)] uppercase mb-1.5"
              >
                Telefone / WhatsApp *
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                placeholder="(47) 99999-9999"
                className="w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-bold text-[var(--ink)] uppercase mb-1.5"
            >
              Assunto
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="Ex: Quero alugar um apartamento / Dúvidas sobre administração"
              className="w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-hidden"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-bold text-[var(--ink)] uppercase mb-1.5"
            >
              Mensagem *
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="Como podemos te ajudar?"
              className="w-full rounded-xl border bg-[var(--surface)] p-4 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="interactive flex w-full items-center justify-center gap-2 rounded-full bg-[var(--plum)] py-4 text-xs font-extrabold tracking-[0.1em] text-white uppercase shadow-md hover:bg-[var(--plum-bright)] disabled:opacity-50 transition-all"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Enviando...
              </>
            ) : (
              <>
                <Send size={16} /> Enviar Mensagem
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
