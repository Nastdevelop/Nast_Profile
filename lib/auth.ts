import { cookies } from "next/headers";
import prisma from "./prisma";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

const TOKEN_NAME = "session_token";
const SESSION_DAYS = 7;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, key] = hash.split(":");
  const derivedKey = scryptSync(password, salt, 64);
  return timingSafeEqual(derivedKey, Buffer.from(key, "hex"));
}

export function generateToken(): string {
  return randomBytes(48).toString("hex");
}

export async function createSession(userId: number): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: { token, userId, expiresAt },
  });

  return token;
}

export async function getSessionUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } });
    }
    return null;
  }

  return session.userId;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return;

  await prisma.session.deleteMany({ where: { token } });
}

export { TOKEN_NAME };
