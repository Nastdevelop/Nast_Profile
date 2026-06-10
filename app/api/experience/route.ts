import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, fail, requireAuth } from "@/lib/api";

export async function GET() {
  const data = await prisma.experience.findMany({ orderBy: { id: "asc" } });
  return ok(data);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { jenis, content, tahun } = await req.json();
    if (!jenis || !content || !tahun)
      return fail("jenis, content, and tahun are required");

    const created = await prisma.experience.create({
      data: { jenis, content, tahun },
    });
    return ok(created, 201);
  } catch {
    return fail("Invalid request body", 400);
  }
}
