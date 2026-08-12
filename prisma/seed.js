const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Running seed...');

  const adminEmail = 'admin@example.com';
  const existing = await prisma.usuario.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hash = await bcrypt.hash('senha123', 10);
    await prisma.usuario.create({
      data: {
        email: adminEmail,
        name: 'Admin',
        password: hash,
        role: 'admin',
      },
    });
    console.log(`Created admin user: ${adminEmail} / senha123`);
  } else {
    console.log('Admin user already exists');
  }

  const count = await prisma.imovel.count();
  if (count === 0) {
    await prisma.imovel.createMany({
      data: [
        {
          title: 'Apartamento na Praia Central',
          description: 'Vista para o mar',
          location: 'Balneário Camboriú',
          price: 1250000,
        },
        {
          title: 'Casa em Camboriú - Jardim',
          description: 'Ótima localização',
          location: 'Camboriú',
          price: 850000,
        },
        {
          title: 'Cobertura vista mar',
          description: 'Cobertura duplex',
          location: 'Balneário Camboriú',
          price: 3200000,
        },
      ],
    });
    console.log('Seeded sample properties');
  } else {
    console.log('Properties already seeded');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
