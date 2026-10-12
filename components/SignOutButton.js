"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      <FiLogOut className="text-base" />
      সাইন আউট
    </button>
  );
}
