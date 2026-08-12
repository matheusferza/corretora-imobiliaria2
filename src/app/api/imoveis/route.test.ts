import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// Provide module-level mocks via factory (hoisted safely)
vi.mock('@/lib/prisma', () => {
  const imovel = {
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findUnique: vi.fn(),
  };
  return { prisma: { imovel } };
});

const mockGetServerSession = vi.fn();
vi.mock('next-auth/next', () => ({
  getServerSession: (...args: any[]) => mockGetServerSession(...args),
}));

let route: any;
let prismaMock: any;

beforeAll(async () => {
  // Import after mocks are registered
  prismaMock = await import('@/lib/prisma');
  route = await import('./route');
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe('API /api/imoveis handlers', () => {
  it('GET returns list of properties', async () => {
    const sample = [{ id: '1', title: 'A', price: 100 }];
    prismaMock.prisma.imovel.findMany.mockResolvedValue(sample);

    const res: any = await route.GET(new Request('http://localhost/api/imoveis'));
    expect(prismaMock.prisma.imovel.findMany).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it('POST rejects when not authenticated', async () => {
    mockGetServerSession.mockResolvedValue(null);
    const req = new Request('http://localhost/api/imoveis', {
      method: 'POST',
      body: JSON.stringify({ title: 'X', location: 'Y', price: 10 }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res: any = await route.POST(req);
    expect(prismaMock.prisma.imovel.create).not.toHaveBeenCalled();
    expect(res.status).toBe(401);
  });

  it('POST creates when admin', async () => {
    mockGetServerSession.mockResolvedValue({ user: { role: 'admin' } });
    prismaMock.prisma.imovel.create.mockResolvedValue({ id: 'abc', title: 'X' });

    const payload = { title: 'X', location: 'Y', price: 10 };
    const req = new Request('http://localhost/api/imoveis', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
    const res: any = await route.POST(req);
    expect(prismaMock.prisma.imovel.create).toHaveBeenCalledWith({ data: payload });
    expect(res.status).toBe(201);
  });

  it('PUT requires id and admin', async () => {
    mockGetServerSession.mockResolvedValue({ user: { role: 'admin' } });
    const req = new Request('http://localhost/api/imoveis', {
      method: 'PUT',
      body: JSON.stringify({ price: 200 }),
      headers: { 'Content-Type': 'application/json' },
    });
    const res: any = await route.PUT(req);
    expect(prismaMock.prisma.imovel.update).not.toHaveBeenCalled();
    expect(res.status).toBe(400);
  });

  it('DELETE requires id and admin', async () => {
    mockGetServerSession.mockResolvedValue({ user: { role: 'admin' } });
    const res: any = await route.DELETE(new Request('http://localhost/api/imoveis'));
    expect(prismaMock.prisma.imovel.delete).not.toHaveBeenCalled();
    expect(res.status).toBe(400);
  });
});
