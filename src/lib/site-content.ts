import { prisma } from "@/lib/prisma";

const fallbackSettings = {
  id: "principal",
  brandName: "Corretora Val",
  tagline: "Confiança que abre portas.",
  phone: "(47) 97400-7301",
  whatsapp: "5547974007301",
  email: "contato@corretoraval.com.br",
  address: "Balneário Camboriú — SC",
  instagramUrl: "https://www.instagram.com/",
  creci: "CRECI/SC 56372-F",
};

export async function getSiteSettings() {
  try {
    return (
      (await prisma.configuracaoSite.findUnique({
        where: { id: "principal" },
      })) ?? fallbackSettings
    );
  } catch {
    return fallbackSettings;
  }
}

export async function getPublishedPages() {
  try {
    return await prisma.paginaSite.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}
