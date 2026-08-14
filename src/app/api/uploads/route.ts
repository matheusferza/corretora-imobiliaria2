import { NextResponse } from "next/server";
import { getStorageProvider } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = `${Date.now()}-${file.name}`.replace(
      /[^a-zA-Z0-9.\-_]/g,
      "_",
    );
    const provider = getStorageProvider();
    const uploaded = await provider.uploadFile(buffer, filename);
    return NextResponse.json({
      ok: true,
      url: uploaded.url,
      path: uploaded.path,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
