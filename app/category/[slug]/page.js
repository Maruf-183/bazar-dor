"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import NotFoundBox from "@/components/NotFoundBox";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import SortSelect from "@/components/SortSelect";
import { useProducts } from "@/components/ProductsProvider";
import { sortProducts, toBn } from "@/lib/format";

export default function CategoryPage() {
  const { slug } = useParams();
  const { products, categories, loading } = useProducts();
  const [sort, setSort] = useState("default");

  const category = categories.find((item) => item.slug === slug) || null;
  const filtered = useMemo(
    () => products.filter((product) => product.category === slug),
    [products, slug],
  );
  const sorted = useMemo(() => sortProducts(filtered, sort), [filtered, sort]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 h-24 animate-pulse rounded-2xl bg-page" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!category && filtered.length === 0) {
    return (
      <NotFoundBox
        title="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি"
        message="ক্যাটাগরির লিংকটি ঠিক আছে কি না দেখুন অথবা হোম পেজ থেকে আবার চেষ্টা করুন।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-page text-2xl">
              {category?.icon || "📦"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink">{category?.nameBn || "ক্যাটাগরি"}</h1>
              <div className="text-sm text-muted">
                {toBn(filtered.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </div>
            </div>
          </div>

          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 text-sm text-muted">মোট {toBn(filtered.length)}টি পণ্য দেখানো হচ্ছে</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
