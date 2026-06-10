import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { verifyPassword, createSession, TOKEN_NAME } from "@/lib/auth";
import { ok, fail } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return fail("Email and password required");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !verifyPassword(password, user.password))
      return fail("Invalid credentials", 401);

    const token = await createSession(user.id);

    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return ok({ user: { id: user.id, email: user.email, name: user.name } });
  } catch {
    return fail("Something went wrong", 500);
  }
}
