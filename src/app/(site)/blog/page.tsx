import { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { CTASection } from "@/components/site/cta-section";
import { prisma } from "@/lib/prisma";
import { BlogClientWrapper } from "./blog-client-wrapper";

export const metadata: Metadata = {
  title: "Blog Imobiliário | Corretora Val",
  description:
    "Conteúdos, guias de investimento, dicas de locação e análises do mercado imobiliário em Balneário Camboriú e Camboriú.",
};

export default async function BlogPage() {
  const posts = await prisma.postBlog.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow="Conteúdo & Mercado"
        title="Conteúdos para ajudar você a tomar melhores decisões imobiliárias."
        subtitle="Artigos exclusivos sobre investimentos, tendências de mercado, locação anual e orientações práticas para proprietários e compradores."
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="shell">
          <BlogClientWrapper initialPosts={posts} />
        </div>
      </section>

      <CTASection
        title="Quer sugestões personalizadas para o seu investimento?"
        description="Fale diretamente com nossa equipe e receba análises do mercado imobiliário catarinense."
      />
    </main>
  );
}
