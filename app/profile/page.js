import Link from "next/link";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await requireSession("/profile");
  const user = session.user || {};

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink">আমার প্রোফাইল</h1>
        <p className="mt-2 text-sm text-muted">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar user={{ name: user.name, image: user.image }} size={56} />
            <div>
              <div className="text-lg font-semibold text-ink">{user.name}</div>
              <div className="text-sm text-muted">{user.email}</div>
            </div>
          </div>

          <SignOutButton />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-sm">
        <div className="mb-4 text-lg font-bold text-ink">তথ্য</div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3 text-sm">
            <span className="text-muted">নাম</span>
            <span className="font-medium text-ink">{user.name}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">ইমেইল</span>
            <span className="font-medium text-ink">{user.email}</span>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
