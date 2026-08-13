-- CreateEnum
CREATE TYPE "Finalidade" AS ENUM ('VENDA', 'LOCACAO_ANUAL', 'TEMPORADA');

-- CreateEnum
CREATE TYPE "StatusImovel" AS ENUM ('DISPONIVEL', 'RESERVADO', 'EM_NEGOCIACAO', 'ALUGADO', 'VENDIDO', 'INDISPONIVEL', 'ARQUIVADO');

-- CreateEnum
CREATE TYPE "VisibilidadeEndereco" AS ENUM ('EXATA', 'APROXIMADA');

-- CreateEnum
CREATE TYPE "StatusDocumentacao" AS ENUM ('REGULAR', 'EM_ANDAMENTO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "MarcadorImovel" AS ENUM ('DESTAQUE', 'LANCAMENTO', 'OPORTUNIDADE', 'EXCLUSIVIDADE', 'ALTO_PADRAO', 'FRENTE_MAR', 'QUADRA_MAR', 'ESTUDANTE', 'PET_FRIENDLY');

-- CreateTable
CREATE TABLE "Imovel" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "description" TEXT,
    "propertyType" TEXT NOT NULL,
    "purpose" "Finalidade" NOT NULL,
    "status" "StatusImovel" NOT NULL DEFAULT 'DISPONIVEL',
    "documentationStatus" "StatusDocumentacao" NOT NULL DEFAULT 'REGULAR',
    "city" TEXT NOT NULL,
    "neighborhood" TEXT,
    "address" TEXT,
    "postalCode" TEXT,
    "addressVisibility" "VisibilidadeEndereco" NOT NULL DEFAULT 'APROXIMADA',
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "salePrice" INTEGER,
    "monthlyRent" INTEGER,
    "condoFee" INTEGER,
    "iptu" INTEGER,
    "waterFee" INTEGER,
    "gasFee" INTEGER,
    "garbageFee" INTEGER,
    "otherFees" INTEGER,
    "dailyRate" INTEGER,
    "packageRate" INTEGER,
    "cleaningFee" INTEGER,
    "securityDeposit" INTEGER,
    "bedrooms" INTEGER,
    "suites" INTEGER,
    "bathrooms" INTEGER,
    "halfBathrooms" INTEGER,
    "parkingSpaces" INTEGER,
    "privateArea" INTEGER,
    "totalArea" INTEGER,
    "floor" INTEGER,
    "hasElevator" BOOLEAN NOT NULL DEFAULT false,
    "hasBalcony" BOOLEAN NOT NULL DEFAULT false,
    "hasBarbecue" BOOLEAN NOT NULL DEFAULT false,
    "hasPool" BOOLEAN NOT NULL DEFAULT false,
    "furnished" BOOLEAN NOT NULL DEFAULT false,
    "hasAirConditioning" BOOLEAN NOT NULL DEFAULT false,
    "allowsPets" BOOLEAN NOT NULL DEFAULT false,
    "hasWifi" BOOLEAN NOT NULL DEFAULT false,
    "seaView" BOOLEAN NOT NULL DEFAULT false,
    "oceanFront" BOOLEAN NOT NULL DEFAULT false,
    "beachBlock" BOOLEAN NOT NULL DEFAULT false,
    "videoUrl" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "markers" "MarcadorImovel"[],
    "internalDocumentsNote" TEXT,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3),
    "value" INTEGER NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Foto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "isCover" BOOLEAN NOT NULL DEFAULT false,
    "imovelId" TEXT NOT NULL,

    CONSTRAINT "Foto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Imovel_code_key" ON "Imovel"("code");
CREATE UNIQUE INDEX "Imovel_slug_key" ON "Imovel"("slug");
CREATE INDEX "Imovel_purpose_status_idx" ON "Imovel"("purpose", "status");
CREATE INDEX "Imovel_city_neighborhood_idx" ON "Imovel"("city", "neighborhood");
CREATE INDEX "Imovel_isFeatured_idx" ON "Imovel"("isFeatured");
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE INDEX "Foto_imovelId_position_idx" ON "Foto"("imovelId", "position");

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Foto" ADD CONSTRAINT "Foto_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
