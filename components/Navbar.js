"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useBanglaDate } from "@/lib/useBanglaDate";
import { useProducts } from "@/components/ProductsProvider";
import UserMenu from "@/components/UserMenu";

export default function Navbar() {
  const pathname = usePathname();
  const today = useBanglaDate();
  const { categories, loading } = useProducts();
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
            <div>
              <div className="text-lg font-bold text-ink">বাজার দর</div>
              <div className="text-xs text-muted">{today || "আজকের তারিখ"}</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="h-6 w-6 animate-pulse rounded-full bg-page" />
            ) : session ? (
              <UserMenu user={session.user} />
            ) : (
              <>
                <Link href="/signin" className="text-sm font-medium text-ink hover:text-brand">
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-dark"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 border-t border-line pt-3">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto whitespace-nowrap">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-9 w-20 animate-pulse rounded-full bg-page"
                  />
                ))
              : categories.map((category) => {
                  const active = pathname === `/category/${category.slug}`;
                  return (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition ${
                        active ? "bg-brand text-white" : "text-ink hover:bg-page"
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span>{category.nameBn}</span>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </header>
  );
}
