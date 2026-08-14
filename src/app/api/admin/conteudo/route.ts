import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

const settingsSchema = z.object({
  brandName: z.string().trim().min(2).max(80),
  tagline: z.string().trim().min(2).max(160),
  phone: z.string().trim().max(40).nullable(),
  whatsapp: z.string().trim().max(32).nullable(),
  email: z.string().trim().email().nullable(),
  address: z.string().trim().max(160).nullable(),
  instagramUrl: z.string().trim().url().nullable(),
  creci: z.string().trim().min(3).max(60),
});

const pageSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  navigationLabel: z.string().trim().min(2).max(40),
  eyebrow: z.string().trim().max(80).nullable(),
  title: z.string().trim().min(3).max(160),
  heading: z.string().trim().min(3).max(220),
  intro: z.string().trim().max(1_000).nullable(),
  body: z.string().trim().max(8_000).nullable(),
  ctaLabel: z.string().trim().max(60).nullable(),
  ctaHref: z.string().trim().max(500).nullable(),
  seoTitle: z.string().trim().max(160).nullable(),
  seoDescription: z.string().trim().max(320).nullable(),
  isPublished: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
});

const requestSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("settings"), settings: settingsSchema }),
  z.object({ type: z.literal("page"), page: pageSchema }),
]);

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "admin";
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [settings, pages] = await prisma.$transaction([
    prisma.configuracaoSite.findUnique({ where: { id: "principal" } }),
    prisma.paginaSite.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  return NextResponse.json({ settings, pages });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = requestSchema.parse(await request.json());
    if (payload.type === "settings") {
      const settings = await prisma.configuracaoSite.upsert({
        where: { id: "principal" },
        update: payload.settings,
        create: { id: "principal", ...payload.settings },
      });
      return NextResponse.json({ settings });
    }

    const page = await prisma.paginaSite.upsert({
      where: { slug: payload.page.slug },
      update: payload.page,
      create: payload.page,
    });
    return NextResponse.json({ page });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
