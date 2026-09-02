const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function money(n: number | null | undefined) {
  if (n == null) return "Inquire";
  return usd.format(n);
}
