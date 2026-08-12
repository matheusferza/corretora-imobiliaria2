// Lightweight Prisma client wrapper that avoids multiple instances in dev
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __prisma: any | undefined;
}

let prisma: any;
try {
  // Use require to avoid TS errors before dependencies are installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaClient } = require('@prisma/client');

  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
  } else {
    if (!global.__prisma) {
      global.__prisma = new PrismaClient();
    }
    prisma = global.__prisma;
  }
} catch (e) {
  // If @prisma/client is not installed yet, export a stub to avoid runtime crashes during dev edits.
  prisma = null;
}

export { prisma };
