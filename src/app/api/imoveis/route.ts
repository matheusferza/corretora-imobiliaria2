import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  location: z.string().min(1),
  price: z.number().int().nonnegative(),
});

const updateSchema = createSchema.partial();

export async function GET(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: 'Prisma client not initialized' }, { status: 500 });
  }
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (id) {
    const item = await prisma.imovel.findUnique({ where: { id }, include: { photos: true } });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
  }

  const list = await prisma.imovel.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: 'Prisma client not initialized' }, { status: 500 });
  }
  // Require authenticated admin
  const session = await getServerSession();
  if (!session || (session as any).user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    const data = createSchema.parse(body);
    const created = await prisma.imovel.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: 'Prisma client not initialized' }, { status: 500 });
  }
  const session = await getServerSession();
  if (!session || (session as any).user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    const body = await req.json();
    const data = updateSchema.parse(body);
    const updated = await prisma.imovel.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (err: any) {
    if (err?.issues) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    if (err?.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!prisma) {
    return NextResponse.json({ error: 'Prisma client not initialized' }, { status: 500 });
  }
  const session = await getServerSession();
  if (!session || (session as any).user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await prisma.imovel.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
