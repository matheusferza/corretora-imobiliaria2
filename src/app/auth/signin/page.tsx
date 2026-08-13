"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const requestedPath = new URLSearchParams(window.location.search).get(
      "callbackUrl",
    );
    const callbackUrl =
      requestedPath?.startsWith("/") && !requestedPath.startsWith("//")
        ? requestedPath
        : "/admin/imoveis";
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    if (res?.error) {
      setError(res.error as string);
    } else {
      router.replace(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="shell py-20">
      <div className="mx-auto max-w-md rounded-2xl border bg-[var(--surface)] p-8">
        <h1 className="text-2xl font-bold text-[var(--plum)]">Entrar</h1>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            className="rounded-md border px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="rounded-md border px-3 py-2"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <button
            className="rounded-full bg-[var(--plum)] px-4 py-2 text-white"
            type="submit"
          >
            Entrar
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
