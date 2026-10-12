import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function UpdateProfilePage() {
  const session = await requireSession("/profile/update");
  const currentName = session.user?.name || "";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">তথ্য আপডেট করুন</h1>
      </div>

      <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
        <UpdateProfileForm currentName={currentName} />
      </div>

      <Link href="/profile" className="mt-6 inline-flex text-sm text-muted hover:text-brand">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
