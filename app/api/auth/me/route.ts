import prisma from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import { ok, fail } from "@/lib/api";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return fail("Unauthorized", 401);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  });

  return ok({ user });
}
