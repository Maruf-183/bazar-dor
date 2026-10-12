export default function SkeletonCard() {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-page" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 rounded bg-page" />
            <div className="h-3 w-16 rounded bg-page" />
          </div>
        </div>
        <div className="h-3 w-28 rounded bg-page" />
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 rounded bg-page" />
          <div className="h-6 w-16 rounded-full bg-page" />
        </div>
      </div>
    </div>
  );
}
