import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { ok, fail, requireAuth } from "@/lib/api";

export async function GET() {
  const data = await prisma.skill.findMany({ orderBy: { id: "asc" } });
  return ok(data);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { item, cate, purpose } = await req.json();
    if (!item || !cate || !purpose)
      return fail("item, cate, and purpose are required");

    const created = await prisma.skill.create({
      data: { item, cate, purpose, authorId: 1 },
    });
    return ok(created, 201);
  } catch {
    return fail("Invalid request body", 400);
  }
}
