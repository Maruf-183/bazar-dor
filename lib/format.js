const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value) {
  return String(value).replace(/\d/g, (d) => bnDigits[d]);
}

export function formatPrice(n) {
  const text = Number.isInteger(n)
    ? n.toLocaleString("en-US")
    : n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return toBn(text);
}

export function formatPct(pct) {
  return toBn(Math.abs(pct).toFixed(1));
}

const units = {
  kg: { long: "প্রতি কেজি", short: "কেজি" },
  litre: { long: "প্রতি লিটার", short: "লিটার" },
  dozen: { long: "প্রতি ডজন", short: "ডজন" },
  piece: { long: "প্রতি পিস", short: "পিস" },
};

export function unitLong(unit) {
  return units[unit]?.long ?? `প্রতি ${unit}`;
}

export function unitShort(unit) {
  return units[unit]?.short ?? unit;
}

export function sortProducts(list, mode) {
  if (mode === "low") return [...list].sort((a, b) => Number(a.today) - Number(b.today));
  if (mode === "high") return [...list].sort((a, b) => Number(b.today) - Number(a.today));
  return list;
}