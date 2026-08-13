import { getSiteSettings } from "@/lib/site-content";
import { BookOpen, Building2, Settings } from "lucide-react";
import Link from "next/link";

const actions = [
  { href: "/admin/imoveis", label: "Gerenciar imóveis", text: "Cadastro, destaque e arquivamento do catálogo.", icon: Building2 },
  { href: "/admin/conteudo", label: "Editar páginas", text: "Textos, títulos, SEO e chamadas das páginas públicas.", icon: BookOpen },
  { href: "/admin/conteudo#configuracoes", label: "Configurar site", text: "Contato, WhatsApp, marca e redes sociais.", icon: Settings },
];

export default async function AdminPage() {
  const settings = await getSiteSettings();

  return (
    <main className="p-6 sm:p-10">
      <p className="eyebrow">Painel Corretora Val</p>
      <h1 className="display mt-3 text-4xl text-[var(--plum)] sm:text-5xl">Olá, {settings.brandName}</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-soft)]">Gerencie o conteúdo e a operação do site sem depender de alterações em código.</p>
      <section className="mt-9 grid gap-5 md:grid-cols-3">
        {actions.map(({ href, label, text, icon: Icon }) => (
          <Link className="interactive rounded-2xl border bg-[var(--surface)] p-6 shadow-[0_8px_22px_rgba(53,16,79,0.06)] hover:-translate-y-1 hover:border-[var(--gold)]" href={href} key={href}>
            <Icon className="text-[var(--gold)]" size={23} />
            <h2 className="display mt-5 text-2xl text-[var(--plum)]">{label}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{text}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
