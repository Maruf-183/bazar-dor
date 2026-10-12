import Link from "next/link";
import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { getSession, safeNext } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next = safeNext(params?.next);
  const reason = params?.reason;

  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <SignInForm next={next} showNotice={reason === "login"} />
      </div>
      <Link href="/" className="mt-6 text-sm text-muted hover:text-brand">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
