"use client";

import Link from "next/link";
import { useProducts } from "@/components/ProductsProvider";
import ChangeBadge from "@/components/ChangeBadge";
import NotFoundBox from "@/components/NotFoundBox";
import { formatPrice, unitLong, unitShort } from "@/lib/format";

export default function ProductDetails({ slug }) {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
        <div className="h-12 animate-pulse rounded-xl bg-page" />
        <div className="h-52 animate-pulse rounded-2xl bg-page" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-2xl bg-page" />
          ))}
        </div>
      </div>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <NotFoundBox title="এই পণ্যটি খুঁজে পাওয়া যায়নি" message="পণ্যের লিংকটি ঠিক আছে কি না দেখুন।" />;
  }

  const delta = product.today - product.yesterday;
  const changeText = delta > 0 ? "বেড়েছে" : delta < 0 ? "কমেছে" : "অপরিবর্তিত";
  const changeColor = delta > 0 ? "text-up" : delta < 0 ? "text-down" : "text-muted";
  const minMarket = [...product.markets].sort((a, b) => a.min - b.min)[0];
  const maxMarket = [...product.markets].sort((a, b) => b.max - a.max)[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 text-sm text-muted">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-brand">
            হোম
          </Link>
          <span>›</span>
          <Link href={`/category/${product.category}`} className="hover:text-brand">
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-ink">{product.nameBn}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-page text-3xl">
              {product.image}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink">{product.nameBn}</h1>
              <div className="mt-1 text-sm text-muted">
                {unitLong(product.unit)} · {product.categoryNameBn}
              </div>
              <div className="mt-3 text-sm text-muted">
                গতকালের তুলনায় আজ দাম
                <span className={`ml-1 font-semibold ${changeColor}`}>
                  {changeText}
                </span>
                {delta !== 0 && (
                  <span className="ml-1 text-ink">· {formatPrice(Math.abs(delta))} টাকা</span>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-page p-3 md:min-w-[200px]">
            <div className="text-xs text-muted">আজকের দাম</div>
            <div className="mt-2 flex items-end gap-1">
              <span className="text-2xl font-bold text-ink">{formatPrice(product.today)}</span>
              <span className="text-sm text-muted">টাকা/{unitShort(product.unit)}</span>
            </div>
            <div className="mt-3">
              <ChangeBadge change={product.change} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white p-5">
        <div className="mb-4 text-lg font-bold text-ink">দামের সারসংক্ষেপ</div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-4">
            <div className="text-sm text-muted">সর্বনিম্ন দাম</div>
            <div className="mt-2 text-2xl font-bold text-down">{formatPrice(minMarket.min)} টাকা</div>
            <div className="mt-2 text-xs text-muted">সবচেয়ে কম দামের বাজার: {minMarket.market}</div>
          </div>

          <div className="rounded-xl border border-line bg-white p-4">
            <div className="text-sm text-muted">সর্বোচ্চ দাম</div>
            <div className="mt-2 text-2xl font-bold text-up">{formatPrice(maxMarket.max)} টাকা</div>
            <div className="mt-2 text-xs text-muted">সবচেয়ে বেশি দামের বাজার: {maxMarket.market}</div>
          </div>

          <div className="rounded-xl border border-line bg-white p-4">
            <div className="text-sm text-muted">গড় দাম</div>
            <div className="mt-2 text-2xl font-bold text-ink">{formatPrice(product.today)} টাকা</div>
            <div className="mt-2 text-xs text-muted">{unitLong(product.unit)} হিসাবে</div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-white p-5">
        <div className="mb-4 text-lg font-bold text-ink">বাজারভিত্তিক আজকের দাম</div>
        <div className="overflow-x-auto">
          <table className="min-w-[560px] w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="pb-3 pr-3 font-medium">বাজার</th>
                <th className="pb-3 pr-3 font-medium">বিভাগ</th>
                <th className="pb-3 pr-3 font-medium">সর্বনিম্ন</th>
                <th className="pb-3 pr-3 font-medium">সর্বোচ্চ</th>
                <th className="pb-3 pr-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((market, index) => {
                const avg = (market.min + market.max) / 2;
                return (
                  <tr key={`${market.market}-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-page/70"}>
                    <td className="py-3 pr-3">{market.market}</td>
                    <td className="py-3 pr-3">{market.division}</td>
                    <td className="py-3 pr-3">{formatPrice(market.min)} টাকা</td>
                    <td className="py-3 pr-3">{formatPrice(market.max)} টাকা</td>
                    <td className="py-3 pr-3 text-right font-semibold text-ink">{formatPrice(avg)} টাকা</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
