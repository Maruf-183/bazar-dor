"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName || "");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    try {
      setPending(true);
      await authClient.updateUser({ name: trimmed });
      toast.success("প্রোফাইল আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error("নাম আপডেট করা যায়নি");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-ink">তথ্য আপডেট করুন</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink focus:border-brand focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-80"
        >
          {pending ? "অপেক্ষা করুন..." : "আপডেট"}
        </button>
      </form>
    </div>
  );
}
