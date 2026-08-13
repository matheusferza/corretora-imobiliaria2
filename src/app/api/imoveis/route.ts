import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { revalidatePath } from 'next/cache';
import { getStorageProvider } from '@/lib/storage';

const purposes = ["VENDA", "LOCACAO_ANUAL", "TEMPORADA"] as const;
const statuses = [
  "DISPONIVEL",
  "RESERVADO",
  "EM_NEGOCIACAO",
  "ALUGADO",
  "VENDIDO",
  "INDISPONIVEL",
  "ARQUIVADO",
] as const;
const markers = [
  "DESTAQUE",
  "LANCAMENTO",
  "OPORTUNIDADE",
  "EXCLUSIVIDADE",
  "ALTO_PADRAO",
  "FRENTE_MAR",
  "QUADRA_MAR",
  "ESTUDANTE",
  "PET_FRIENDLY",
] as const;

const optionalText = z.string().trim().max(4_000).optional().nullable();
const optionalAmount = z.number().int().nonnegative().optional().nullable();
const optionalInteger = z.number().int().nonnegative().optional().nullable();

const propertyFields = z.object({
  code: z.string().trim().min(3).max(32),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(3).max(160),
  summary: optionalText,
  description: optionalText,
  propertyType: z.string().trim().min(2).max(80),
  purpose: z.enum(purposes),
  status: z.enum(statuses).default("DISPONIVEL"),
  city: z.string().trim().min(2).max(80),
  neighborhood: z.string().trim().max(80).optional().nullable(),
  salePrice: optionalAmount,
  monthlyRent: optionalAmount,
  dailyRate: optionalAmount,
  bedrooms: optionalInteger,
  suites: optionalInteger,
  bathrooms: optionalInteger,
  parkingSpaces: optionalInteger,
  privateArea: optionalInteger,
  isFeatured: z.boolean().default(false),
  markers: z.array(z.enum(markers)).default([]),
});

const propertySchema = propertyFields.superRefine((data, ctx) => {
  const priceByPurpose = {
    VENDA: data.salePrice,
    LOCACAO_ANUAL: data.monthlyRent,
    TEMPORADA: data.dailyRate,
  };

  if (priceByPurpose[data.purpose] == null) {
    ctx.addIssue({
      code: "custom",
      path: ["purpose"],
      message: "Informe o valor principal para a finalidade do imóvel.",
    });
  }
});

const updateSchema = propertyFields
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe ao menos um campo para atualizar",
  });

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}

function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: error.issues }, { status: 400 });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Código ou URL amigável já está em uso." },
        { status: 409 },
      );
    }
  }

  // Log error server-side; return a generic 500 to the client to avoid leaking internals
  if (error instanceof Error) {
    console.error('API /api/imoveis internal error:', error);
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const purpose = url.searchParams.get("purpose");

  if (id) {
    const item = await prisma.imovel.findUnique({
      where: { id },
      include: { photos: { orderBy: { position: "asc" } } },
    });
    if (!item)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  }

  const list = await prisma.imovel.findMany({
    where: {
      archivedAt: null,
      ...(purposes.includes(purpose as (typeof purposes)[number])
        ? { purpose: purpose as (typeof purposes)[number] }
        : {}),
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    include: { photos: { orderBy: { position: "asc" }, take: 1 } },
  });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = propertySchema.parse(body);
    const created = await prisma.imovel.create({ data });

    // handle photos if provided in payload (uploaded earlier via /api/uploads)
    if (Array.isArray(body.photos) && body.photos.length > 0) {
      try {
        const photosToCreate = body.photos.map((p: any, i: number) => ({
          url: p.url,
          alt: p.alt ?? null,
          position: typeof p.position === 'number' ? p.position : i,
          isCover: !!p.isCover,
          imovelId: created.id,
        }));
        await prisma.foto.createMany({ data: photosToCreate });
      } catch (e) {
        console.error('Creating photos failed:', e);
      }
    }

    try {
      // on-demand revalidation for public listing and individual page
      revalidatePath('/imoveis');
      if (created.slug) revalidatePath(`/imoveis/${created.slug}`);
    } catch (e) {
      console.error('Revalidate after create failed:', e);
    }
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('API /api/imoveis POST error:', error);
    return errorResponse(error);
  }
}

export async function PUT(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const data = updateSchema.parse(await req.json());
    const updated = await prisma.imovel.update({ where: { id }, data });
    try {
      revalidatePath('/imoveis');
      if (updated.slug) revalidatePath(`/imoveis/${updated.slug}`);
    } catch (e) {
      console.error('Revalidate after update failed:', e);
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('API /api/imoveis PUT error:', error);
    return errorResponse(error);
  }
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const archived = await prisma.imovel.update({
      where: { id },
      data: { archivedAt: new Date(), status: "ARQUIVADO", isFeatured: false },
    });
    try {
      revalidatePath('/imoveis');
      if (archived.slug) revalidatePath(`/imoveis/${archived.slug}`);
    } catch (e) {
      console.error('Revalidate after archive failed:', e);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /api/imoveis DELETE error:', error);
    return errorResponse(error);
  }
}
