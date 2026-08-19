import type { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();
    const category = searchParams.get("category")?.trim();

    const where: Prisma.PostBlogWhereInput = {
      isPublished: true,
    };

    if (category && category !== "Todos") {
      where.category = category;
    }

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { summary: { contains: q, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.postBlog.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Erro ao buscar posts do blog:", error);
    return NextResponse.json(
      { error: "Erro ao buscar posts" },
      { status: 500 },
    );
  }
}
