import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import { formatPrice, unitLong } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="rounded-xl border border-line bg-card p-4 transition hover:border-brand/40 hover:shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-page text-xl">
            {product.image}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold text-ink">{product.nameBn}</div>
            <div className="text-xs text-muted">{unitLong(product.unit)}</div>
          </div>
        </div>

        <div className="mt-5 text-xs text-muted">আজকের দাম</div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-ink">{formatPrice(product.today)}</span>
            <span className="text-sm text-muted">টাকা</span>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}
