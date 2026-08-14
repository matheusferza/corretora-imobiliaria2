import { getSiteSettings } from "@/lib/site-content";
import { MessageCircle } from "lucide-react";

export async function WhatsAppFloat() {
  const settings = await getSiteSettings();
  const href = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp}`
    : "/contato";
  return (
    <a
      aria-label={`Falar com ${settings.brandName} pelo WhatsApp`}
      className="interactive fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full bg-[var(--plum)] text-white shadow-[0_10px_30px_rgba(53,16,79,0.3)] hover:-translate-y-1 hover:bg-[var(--plum-bright)]"
      href={href}
      rel="noreferrer"
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      <MessageCircle aria-hidden="true" size={23} />
    </a>
  );
}
