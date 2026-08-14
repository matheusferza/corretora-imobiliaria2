"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="interactive flex items-center gap-2 text-sm font-bold text-white/75 hover:text-white disabled:opacity-60"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signOut({ callbackUrl: "/auth/signin" });
      }}
      type="button"
    >
      <LogOut aria-hidden="true" size={16} />
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
