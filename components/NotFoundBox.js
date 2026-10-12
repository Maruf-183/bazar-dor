import Link from "next/link";

export default function NotFoundBox({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "ইচ্ছে মতো পাতা খুঁজে পাওয়া যায়নি।",
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <div className="text-5xl font-bold text-brand">৪০৪</div>
        <h1 className="mt-4 text-2xl font-bold text-ink">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{message}</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
