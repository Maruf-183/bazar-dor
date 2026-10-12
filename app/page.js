"use client";

import { useMemo } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { useProducts } from "@/components/ProductsProvider";
import { toBn } from "@/lib/format";

export default function HomePage() {
  const { products, loading, error, retry } = useProducts();

  const risers = useMemo(
    () =>
      [...products]
        .filter((product) => product.change?.dir === "up")
        .sort((a, b) => Number(b.change?.pct || 0) - Number(a.change?.pct || 0))
        .slice(0, 6),
    [products],
  );

  const fallers = useMemo(
    () =>
      [...products]
        .filter((product) => product.change?.dir === "down")
        .sort((a, b) => Number(a.change?.pct || 0) - Number(b.change?.pct || 0))
        .slice(0, 6),
    [products],
  );

  const renderSection = (title, items, icon) => (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
        <span className={icon === "up" ? "text-up" : "text-down"}>{icon}</span>
        {title}
      </h2>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={`${title}-${index}`} />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      <Hero />

      {renderSection("আজ দাম বেড়েছে", risers, "▲")}
      {renderSection("আজ দাম কমেছে", fallers, "▼")}

      <section id="সব-পণ্য" className="scroll-mt-24 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-ink">সব পণ্য</h2>
          <p className="mt-1 text-sm text-muted">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={`all-${index}`} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-line bg-white p-6 text-center">
            <p className="text-base font-medium text-ink">ডাটা লোড করা যায়নি</p>
            <button
              type="button"
              onClick={retry}
              className="mt-4 inline-flex rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
