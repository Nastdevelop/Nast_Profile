import { cookies } from "next/headers";
import { destroySession, TOKEN_NAME } from "@/lib/auth";
import { ok } from "@/lib/api";

export async function POST() {
  await destroySession();
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
  return ok({ message: "Logged out" });
}
