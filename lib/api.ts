import { NextResponse } from "next/server";
import { getSessionUserId } from "./auth";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function requireAuth() {
  const userId = await getSessionUserId();
  if (!userId) {
    return { userId: null, error: fail("Unauthorized", 401) };
  }
  return { userId, error: null };
}
