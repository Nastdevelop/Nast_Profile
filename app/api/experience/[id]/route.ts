import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, fail, requireAuth } from "@/lib/api";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAuth();
  if (error) return error;

  const id = Number((await params).id);
  const existing = await prisma.experience.findUnique({ where: { id } });
  if (!existing) return fail("Not found", 404);

  try {
    const { jenis, content, tahun } = await req.json();
    const updated = await prisma.experience.update({
      where: { id },
      data: {
        ...(jenis !== undefined && { jenis }),
        ...(content !== undefined && { content }),
        ...(tahun !== undefined && { tahun }),
      },
    });
    return ok(updated);
  } catch {
    return fail("Invalid request body", 400);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAuth();
  if (error) return error;

  const id = Number((await params).id);
  const existing = await prisma.experience.findUnique({ where: { id } });
  if (!existing) return fail("Not found", 404);

  await prisma.experience.delete({ where: { id } });
  return ok({ message: "Deleted" });
}
