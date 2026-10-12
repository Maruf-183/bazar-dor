"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/authMessages";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    try {
      setPending(true);
      await authClient.signUp.email({ name, email, password });
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
      router.push("/signin");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-ink">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-2 text-sm text-muted">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink placeholder:text-muted focus:border-brand focus:outline-none"
          />
        </div>

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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="আবার লিখুন"
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink placeholder:text-muted focus:border-brand focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-80"
        >
          {pending ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <div className="mt-5 flex items-center gap-3 text-xs text-muted">
        <div className="h-px flex-1 bg-line" />
        <span>অথবা</span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-5">
        <SocialButtons callbackURL="/" />
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        অ্যাকাউন্ট আছে? {" "}
        <Link href="/signin" className="font-medium text-brand hover:text-brand-dark">
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}
