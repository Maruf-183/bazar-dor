"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/authMessages";

export default function SignInForm({ next = "/", showNotice = false }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (showNotice) {
      toast("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
    }
  }, [showNotice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    try {
      setPending(true);
      await authClient.signIn.email({ email, password });
      toast.success("সাইন ইন সফল হয়েছে");
      router.push(next);
      router.refresh();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-ink">সাইন ইন</h1>
      <p className="mt-2 text-sm text-muted">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink placeholder:text-muted focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink placeholder:text-muted focus:border-brand focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-80"
        >
          {pending ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="mt-5 flex items-center gap-3 text-xs text-muted">
        <div className="h-px flex-1 bg-line" />
        <span>অথবা</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-5">
        <SocialButtons callbackURL={next} />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        অ্যাকাউন্ট নেই? {" "}
        <Link href="/signup" className="font-medium text-brand hover:text-brand-dark">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}
