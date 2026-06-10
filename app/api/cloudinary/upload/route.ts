import { NextRequest } from "next/server";
import { uploadImage } from "@/lib/cloudinary";
import { ok, fail, requireAuth } from "@/lib/api";

export async function POST(req: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { image } = await req.json();
    if (!image || typeof image !== "string")
      return fail("image (base64) is required");

    const url = await uploadImage(image);
    return ok({ url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : JSON.stringify(err) ?? "Unknown error";
    console.error("Upload error:", err);
    return fail(`Upload failed: ${msg}`, 500);
  }
}
