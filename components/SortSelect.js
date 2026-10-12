export default function SortSelect({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <label htmlFor="sort-products" className="font-medium text-ink">
        সাজান
      </label>
      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none rounded-lg border border-line bg-white px-3 py-2 text-ink outline-none transition focus:border-brand"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">কম দামের আগে</option>
        <option value="high">বেশি দামের আগে</option>
      </select>
    </div>
  );
}
