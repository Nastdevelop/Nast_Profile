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
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return fail("Not found", 404);

  try {
    const { title, images, desc, content, tech, posisi, url } = await req.json();
    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(images !== undefined && { images }),
        ...(desc !== undefined && { desc }),
        ...(content !== undefined && { content }),
        ...(tech !== undefined && { tech: JSON.stringify(tech) }),
        ...(posisi !== undefined && { posisi }),
        ...(url !== undefined && { url }),
      },
    });
    return ok({ ...updated, tech: safeParseJson(updated.tech) });
  } catch (err) {
    console.error("Update project error:", err);
    return fail("Invalid request body", 400);
  }
}

function safeParseJson(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAuth();
  if (error) return error;

  const id = Number((await params).id);
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return fail("Not found", 404);

  await prisma.project.delete({ where: { id } });
  return ok({ message: "Deleted" });
}
