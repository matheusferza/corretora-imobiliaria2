const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const properties = [
  {
    code: "VAL-001",
    slug: "apartamento-praia-central",
    title: "Apartamento na Praia Central",
    summary: "Vista para o mar em localização privilegiada.",
    description: "Apartamento amplo, bem iluminado e próximo à praia.",
    propertyType: "Apartamento",
    purpose: "VENDA",
    city: "Balneário Camboriú",
    neighborhood: "Centro",
    salePrice: 1250000,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parkingSpaces: 2,
    privateArea: 110,
    hasBalcony: true,
    hasBarbecue: true,
    seaView: true,
    isFeatured: true,
    markers: ["DESTAQUE", "ALTO_PADRAO"],
  },
  {
    code: "VAL-002",
    slug: "casa-jardim-camboriu",
    title: "Casa em Camboriú - Jardim",
    summary: "Uma casa confortável para viver com tranquilidade.",
    description: "Casa com ótima localização e espaço para a família.",
    propertyType: "Casa",
    purpose: "VENDA",
    city: "Camboriú",
    neighborhood: "Centro",
    salePrice: 850000,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 2,
    privateArea: 140,
    allowsPets: true,
    isFeatured: true,
    markers: ["OPORTUNIDADE", "PET_FRIENDLY"],
  },
  {
    code: "VAL-003",
    slug: "cobertura-vista-mar",
    title: "Cobertura vista mar",
    summary: "Cobertura duplex com vista aberta para o mar.",
    description: "Ambientes integrados e localização frente mar.",
    propertyType: "Cobertura",
    purpose: "VENDA",
    city: "Balneário Camboriú",
    neighborhood: "Barra Sul",
    salePrice: 3200000,
    bedrooms: 4,
    suites: 2,
    bathrooms: 4,
    parkingSpaces: 3,
    privateArea: 220,
    hasPool: true,
    oceanFront: true,
    seaView: true,
    isFeatured: true,
    markers: ["DESTAQUE", "ALTO_PADRAO", "FRENTE_MAR"],
  },
];

const pages = [
  {
    slug: "home",
    navigationLabel: "Início",
    eyebrow: "Balneário Camboriú e Camboriú",
    title: "Confiança que abre portas.",
    heading: "Tudo o que seu imóvel precisa, com o cuidado que você espera.",
    intro:
      "Há mais de três décadas, transformamos imóveis em histórias bem cuidadas — com atendimento humano, gestão responsável e compromisso real com o seu patrimônio.",
    body:
      "Uma empresa construída em família, para relações que permanecem muito depois da entrega das chaves.",
    ctaLabel: "Conheça nossos imóveis",
    ctaHref: "/imoveis",
    seoTitle: "Corretora Val | Confiança que abre portas",
    seoDescription:
      "Administração de imóveis, venda, locação anual e temporada em Balneário Camboriú e Camboriú.",
    sortOrder: 0,
  },
  {
    slug: "administracao",
    navigationLabel: "Administração",
    eyebrow: "Patrimônio bem cuidado",
    title: "Administração de imóveis",
    heading: "Cuidamos do seu patrimônio com atenção e transparência.",
    intro:
      "Conte com uma gestão próxima, organizada e preparada para acompanhar cada detalhe do seu imóvel.",
    body:
      "Fale com a Corretora Val para apresentar seu imóvel e entender a melhor forma de administrá-lo.",
    ctaLabel: "Administrar meu imóvel",
    ctaHref: "/contato",
    sortOrder: 1,
  },
  {
    slug: "quem-somos",
    navigationLabel: "Quem Somos",
    eyebrow: "Desde 1990",
    title: "Quem somos",
    heading: "Experiência regional, relações duradouras e atendimento humano.",
    intro:
      "A Corretora Val nasceu para cuidar de imóveis e das histórias que eles abrigam.",
    body:
      "Nossa trajetória é construída em família, com conhecimento de Balneário Camboriú, Camboriú e região.",
    ctaLabel: "Fale conosco",
    ctaHref: "/contato",
    sortOrder: 2,
  },
  {
    slug: "autoridade",
    navigationLabel: "Autoridade",
    eyebrow: "Confiança e experiência",
    title: "Autoridade",
    heading: "Conhecimento imobiliário para decisões mais seguras.",
    intro:
      "Atendimento personalizado, atuação local e compromisso com negociações transparentes.",
    body:
      "CRECI/SC 56372-F. Conteúdo, orientação e experiência para cada etapa da sua decisão imobiliária.",
    ctaLabel: "Conheça nossos imóveis",
    ctaHref: "/imoveis",
    sortOrder: 3,
  },
  {
    slug: "memoria-viva",
    navigationLabel: "Memória Viva",
    eyebrow: "Nossa história",
    title: "Memória Viva",
    heading: "Histórias, encontros e o legado da Corretora Val.",
    intro:
      "Um espaço para compartilhar os capítulos que construíram nossa relação com a região.",
    body:
      "Fotos, bastidores e memórias que preservam a nossa trajetória e os vínculos com cada cliente.",
    sortOrder: 4,
  },
  {
    slug: "blog",
    navigationLabel: "Blog",
    eyebrow: "Conteúdo imobiliário",
    title: "Blog",
    heading: "Informação para orientar sua próxima escolha.",
    intro:
      "Dicas, mercado, administração e conteúdos sobre viver e investir na nossa região.",
    body:
      "Em breve, artigos assinados pela Corretora Val.",
    sortOrder: 5,
  },
  {
    slug: "depoimentos",
    navigationLabel: "Depoimentos",
    eyebrow: "Relações de confiança",
    title: "Depoimentos",
    heading: "Cada experiência autorizada conta um pouco da nossa história.",
    intro:
      "Publicamos relatos de clientes somente com autorização.",
    body:
      "Em breve, histórias compartilhadas por quem confiou seu imóvel e seus projetos à Corretora Val.",
    sortOrder: 6,
  },
  {
    slug: "contato",
    navigationLabel: "Contato",
    eyebrow: "Vamos conversar",
    title: "Contato",
    heading: "Encontre a orientação certa para o seu imóvel.",
    intro:
      "Fale com a Corretora Val por WhatsApp, telefone ou e-mail.",
    body:
      "Estamos em Balneário Camboriú e atendemos também Camboriú e região.",
    ctaLabel: "Falar pelo WhatsApp",
    ctaHref: "https://wa.me/5547974007301",
    sortOrder: 7,
  },
];

async function main() {
  const adminEmail = "admin@example.com";
  const hash = await bcrypt.hash("senha123", 10);

  await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, name: "Admin", password: hash, role: "admin" },
  });

  await prisma.configuracaoSite.upsert({
    where: { id: "principal" },
    update: {},
    create: {
      id: "principal",
      phone: "(47) 97400-7301",
      whatsapp: "5547974007301",
      email: "contato@corretoraval.com.br",
      address: "Balneário Camboriú — SC",
      instagramUrl: "https://www.instagram.com/",
    },
  });

  for (const page of pages) {
    await prisma.paginaSite.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }

  for (const property of properties) {
    await prisma.imovel.upsert({
      where: { code: property.code },
      update: property,
      create: property,
    });
  }

  console.log(`Seed complete. Admin: ${adminEmail} / senha123`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
