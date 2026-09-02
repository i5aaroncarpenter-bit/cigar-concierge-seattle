import { products, type Product } from "@/data/catalog";

export const OCCASIONS = [
  {
    id: "weekday",
    label: "A Tuesday porch",
    hint: "House blends. Posted prices. No theater.",
  },
  {
    id: "game",
    label: "Night game",
    hint: "Husky nation. Maduro. Say who.",
  },
  {
    id: "celebration",
    label: "A night that deserves it",
    hint: "Vault. Aged. Inquire.",
  },
  {
    id: "gift",
    label: "A gift that lands",
    hint: "The box they keep.",
  },
] as const;

export const STRENGTH_CHOICES = [
  { id: "any", label: "Dealer’s choice" },
  { id: "Medium", label: "Medium" },
  { id: "Medium-Full", label: "Medium-Full" },
  { id: "Full", label: "Full" },
] as const;

export const ROOM_CHOICES = [
  { id: "either", label: "Surprise me" },
  { id: "house", label: "House factory" },
  { id: "vault", label: "The vault" },
] as const;

export type OccasionId = (typeof OCCASIONS)[number]["id"];
export type StrengthId = (typeof STRENGTH_CHOICES)[number]["id"];
export type RoomId = (typeof ROOM_CHOICES)[number]["id"];

export type MatchAnswers = {
  occasion: OccasionId;
  strength: StrengthId;
  room: RoomId;
};

export type MatchPick = {
  product: Product;
  score: number;
  why: string;
};

function scoreProduct(p: Product, a: MatchAnswers): MatchPick {
  let score = 0;
  const reasons: string[] = [];

  if (a.room === "house" && p.category === "house") {
    score += 4;
    reasons.push("House factory, posted price.");
  } else if (a.room === "vault" && p.category === "vault") {
    score += 4;
    reasons.push("Vault allocation.");
  } else if (a.room === "either") {
    score += 1;
  } else {
    score -= 2;
  }

  if (a.strength === "any") {
    score += 1;
  } else if (p.strength === a.strength) {
    score += 3;
    reasons.push(`${p.strength} — matches the ask.`);
  } else if (
    (a.strength === "Medium-Full" && p.strength !== "Medium") ||
    (a.strength === "Medium" && p.strength === "Medium-Full")
  ) {
    score += 1;
  }

  if (a.occasion === "weekday") {
    if (p.category === "house") score += 3;
    if (p.price) score += 2;
    if (p.strength === "Medium") score += 1;
    if (p.id === "pigtail-toro" || p.id === "blockbuster") {
      score += 3;
      reasons.push("The Tuesday stick.");
    }
  }

  if (a.occasion === "game") {
    if (p.id === "dawgfather") {
      score += 8;
      reasons.push("Purple Reign. Night games.");
    } else if (p.id === "blockbuster") {
      score += 5;
      reasons.push("House favorite when the lights are on.");
    } else if (p.category === "house") {
      score += 2;
    }
  }

  if (a.occasion === "celebration") {
    if (p.category === "vault") score += 3;
    if (p.strength === "Full") score += 2;
    if (p.id === "opus-x-25" || p.id === "davidoff-100" || p.id === "opus-phantom") {
      score += 4;
      reasons.push("The night actually deserves this.");
    }
  }

  if (a.occasion === "gift") {
    if (p.category === "vault") score += 3;
    if (p.id === "davidoff-100" || p.id === "davidoff-35") {
      score += 4;
      reasons.push("The box they keep.");
    }
    if (p.id === "the-250") {
      score += 3;
      reasons.push("A commemorative bundle that still smokes.");
    }
    if (p.id === "opus-x-25") {
      score += 3;
      reasons.push("Nobody has rare cigars like this desk.");
    }
  }

  if (p.featured) score += 0.5;

  const why =
    reasons[0] ??
    (p.category === "vault"
      ? "Vault piece — priced when the desk replies."
      : "House blend from the Dominican factory.");

  return { product: p, score, why };
}

export function getMatchPicks(answers: MatchAnswers, limit = 3): MatchPick[] {
  return products
    .map((p) => scoreProduct(p, answers))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}