export type ShopSearch = {
  cat: "all" | "house" | "vault";
  q: string;
  strength: "all" | "Medium" | "Medium-Full" | "Full";
};

export function parseShopSearch(s: Record<string, unknown>): ShopSearch {
  return {
    cat: s.cat === "house" || s.cat === "vault" ? s.cat : "all",
    q: typeof s.q === "string" ? s.q : "",
    strength:
      s.strength === "Medium" ||
      s.strength === "Medium-Full" ||
      s.strength === "Full"
        ? s.strength
        : "all",
  };
}
