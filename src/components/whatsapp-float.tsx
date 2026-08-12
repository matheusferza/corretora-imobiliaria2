import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      aria-label="Falar com a Corretora Val pelo WhatsApp"
      className="interactive fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full bg-[var(--plum)] text-white shadow-[0_10px_30px_rgba(53,16,79,0.3)] hover:-translate-y-1 hover:bg-[var(--plum-bright)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
      href="https://wa.me/5547974007301"
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" size={23} />
    </a>
  );
}
