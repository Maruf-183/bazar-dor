"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL }) {
  const handleSocial = async (provider) => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-page"
      >
        <FcGoogle className="text-lg" />
        Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => handleSocial("github")}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-page"
      >
        <FaGithub className="text-lg text-ink" />
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
