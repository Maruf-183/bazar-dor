"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import Avatar from "@/components/Avatar";
import { authClient } from "@/lib/auth-client";

export default function UserMenu({ user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
      setOpen(false);
    } catch (error) {
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  const firstName = user?.name?.split(" ")[0] || "আমার অ্যাকাউন্ট";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-2 py-1.5 text-sm font-medium text-ink"
      >
        <Avatar user={user} size={26} />
        <span>{firstName}</span>
        <FiChevronDown className="text-xs text-muted" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-line bg-white p-3 shadow-sm">
          <div className="flex items-center gap-3 border-b border-line pb-3">
            <Avatar user={user} size={38} />
            <div className="min-w-0">
              <div className="truncate font-semibold text-ink">{user?.name}</div>
              <div className="truncate text-xs text-muted">{user?.email}</div>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink hover:bg-page"
            >
              <FiUser />
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <FiLogOut />
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
