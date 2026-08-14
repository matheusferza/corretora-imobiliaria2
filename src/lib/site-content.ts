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
  return (
    (await prisma.configuracaoSite.findUnique({
      where: { id: "principal" },
    })) ?? fallbackSettings
  );
}

export async function getPublishedPages() {
  return prisma.paginaSite.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
}
