-- CreateEnum
CREATE TYPE "TipoLead" AS ENUM ('ANUNCIAR', 'ALUGAR', 'COMPRAR', 'CONTATO');

-- CreateEnum
CREATE TYPE "StatusLead" AS ENUM ('NOVO', 'EM_ATENDIMENTO', 'CONCLUIDO', 'ARQUIVADO');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "type" "TipoLead" NOT NULL DEFAULT 'CONTATO',
    "subject" TEXT,
    "message" TEXT,
    "propertyAddress" TEXT,
    "propertyType" TEXT,
    "status" "StatusLead" NOT NULL DEFAULT 'NOVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostBlog" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "coverImage" TEXT,
    "authorName" TEXT NOT NULL DEFAULT 'Corretora Val',
    "readingTimeMinutes" INTEGER NOT NULL DEFAULT 5,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostBlog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_type_status_idx" ON "Lead"("type", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PostBlog_slug_key" ON "PostBlog"("slug");

-- CreateIndex
CREATE INDEX "PostBlog_isPublished_category_idx" ON "PostBlog"("isPublished", "category");

-- CreateIndex
CREATE INDEX "PostBlog_isFeatured_idx" ON "PostBlog"("isFeatured");
