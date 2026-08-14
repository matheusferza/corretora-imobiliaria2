import fs from "node:fs";
import path from "node:path";
import type { StorageProvider, UploadResult } from "./index";

export function LocalStorageProvider(): StorageProvider {
  const uploadsRoot = path.join(process.cwd(), "public", "uploads");

  async function ensureDir(filePath: string) {
    const dir = path.dirname(filePath);
    await fs.promises.mkdir(dir, { recursive: true });
  }

  return {
    async uploadFile(buffer: Buffer, destPath: string) {
      const safeDest = destPath.replace(/^[\\/]+/, "");
      const fullPath = path.join(uploadsRoot, safeDest);
      await ensureDir(fullPath);
      await fs.promises.writeFile(fullPath, buffer);
      const url = `/uploads/${safeDest.replace(/\\\\/g, "/")}`;
      const result: UploadResult = { url, path: safeDest };
      return result;
    },
    getUrl(p) {
      if (p.startsWith("/")) return p;
      return `/uploads/${p.replace(/\\\\/g, "/")}`;
    },
    async deleteFile(p) {
      const full = path.join(uploadsRoot, p);
      try {
        await fs.promises.unlink(full);
      } catch {
        // ignore if file does not exist
      }
    },
  };
}
