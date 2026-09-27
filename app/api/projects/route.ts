import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, fail, requireAuth } from "@/lib/api";

export async function GET() {
  const data = await prisma.project.findMany({ orderBy: { id: "asc" } });
  return ok(
    data.map((p) => ({ ...p, tech: safeParseJson(p.tech) }))
  );
}

export async function POST(req: NextRequest) {
  const { error, userId } = await requireAuth();
  if (error) return error;

  try {
    const { title, images, desc, content, tech, posisi, url } = await req.json();
    if (!title) return fail("title is required");

    const created = await prisma.project.create({
      data: { title, images, desc, content, tech: JSON.stringify(tech ?? []), posisi, url, authorId: userId! },
    });
    return ok({ ...created, tech: safeParseJson(created.tech) }, 201);
  } catch (err) {
    console.error("Create project error:", err);
    return fail("Invalid request body", 400);
  }
}

function safeParseJson(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}
