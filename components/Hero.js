"use client";

import Image from "next/image";
import { useBanglaDate } from "@/lib/useBanglaDate";

export default function Hero() {
  const today = useBanglaDate();

  return (
    <section className="rounded-2xl border border-line bg-white p-6 md:p-10">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-down-bg px-3 py-1 text-xs font-medium text-brand-dark">
            {today || "আজকের তারিখ"}
          </div>
          <h1 className="text-3xl font-bold text-ink md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
            গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="mt-6">
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-brand-dark"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={420}
            height={320}
            className="h-auto w-full max-w-[360px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
