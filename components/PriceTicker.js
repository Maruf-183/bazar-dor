"use client";

import { useProducts } from "@/components/ProductsProvider";
import { formatPct, formatPrice, unitShort } from "@/lib/format";

export default function PriceTicker() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className="h-10 border-y border-line bg-white" />;
  }

  if (error || products.length === 0) {
    return null;
  }

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-line bg-white">
      <div className="ticker-track py-2.5">
        {items.map((product, index) => {
          const pct = Number(product.change?.pct ?? 0);
          const direction = product.change?.dir || "flat";
          const changeColor =
            direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-flat";

          return (
            <div
              key={`${product.slug}-${index}`}
              className="flex items-center gap-2 border-r border-line px-4 text-sm text-ink whitespace-nowrap"
            >
              <span>{product.image}</span>
              <span>{product.nameBn}</span>
              <span>
                {formatPrice(product.today)} টাকা/{unitShort(product.unit)}
              </span>
              {direction === "up" ? (
                <span className={changeColor}>▲ {formatPct(pct)}%</span>
              ) : direction === "down" ? (
                <span className={changeColor}>▼ {formatPct(pct)}%</span>
              ) : (
                <span className={changeColor}>— ০.০%</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
