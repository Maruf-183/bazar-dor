import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireSession(nextPath) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(nextPath)}&reason=login`);
  }
  return session;
}

export function safeNext(value) {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/";
}