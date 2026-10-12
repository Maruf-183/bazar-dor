import ProductDetails from "@/components/ProductDetails";
import { requireSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`);
  return <ProductDetails slug={slug} />;
}
