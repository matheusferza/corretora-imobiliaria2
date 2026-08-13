-- CreateTable
CREATE TABLE "ConfiguracaoSite" (
    "id" TEXT NOT NULL DEFAULT 'principal',
    "brandName" TEXT NOT NULL DEFAULT 'Corretora Val',
    "tagline" TEXT NOT NULL DEFAULT 'Confiança que abre portas.',
    "phone" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "address" TEXT,
    "instagramUrl" TEXT,
    "creci" TEXT NOT NULL DEFAULT 'CRECI/SC 56372-F',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracaoSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaginaSite" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "navigationLabel" TEXT NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "intro" TEXT,
    "body" TEXT,
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaginaSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaginaSite_slug_key" ON "PaginaSite"("slug");
CREATE INDEX "PaginaSite_isPublished_sortOrder_idx" ON "PaginaSite"("isPublished", "sortOrder");
