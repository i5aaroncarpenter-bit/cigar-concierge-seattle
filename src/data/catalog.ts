import { z } from "zod";

export const CategorySchema = z.enum(["house", "vault"]);
export const BadgeSchema = z.enum(["limited", "vault"]);
export const AvailabilitySchema = z.enum([
  "in_stock",
  "limited",
  "low",
  "allocated",
  "inquire",
]);

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: CategorySchema,
  brand: z.string(),
  tag: z.string(),
  badge: BadgeSchema,
  format: z.string(),
  wrapper: z.string(),
  origin: z.string(),
  strength: z.enum(["Medium", "Medium-Full", "Full"]),
  price: z.number().positive().nullable(),
  unit: z.string(),
  stock: z.string(),
  availability: AvailabilitySchema,
  image: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  gallery: z.array(z.string()).min(1),
  video: z.string().optional(),
  poster: z.string().optional(),
  tweet: z.string().optional(),
  blurb: z.string(),
  notes: z.string(),
  story: z.string(),
  featured: z.boolean().default(false),
});

export type Product = z.infer<typeof ProductSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Availability = z.infer<typeof AvailabilitySchema>;

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  src: z.string(),
  poster: z.string(),
  tweet: z.string(),
  copy: z.string(),
  productId: z.string().optional(),
});

export type JournalVideo = z.infer<typeof VideoSchema>;

const rawProducts: Product[] = [
  {
    id: "the-250",
    name: "The 250",
    category: "house",
    brand: "Cigar Concierge",
    tag: "Limited Edition",
    badge: "limited",
    format: "Churchill bundle of 10",
    wrapper: "Premium Habano",
    origin: "Dominican Republic",
    strength: "Medium",
    price: 160,
    unit: "bundle of 10",
    stock: "Limited — 1,000 produced",
    availability: "limited",
    image: "/catalog/the-250-bundles.jpg",
    width: 1200,
    height: 900,
    gallery: ["/catalog/the-250-bundles.jpg", "/catalog/house-bands.jpg"],
    video: "/videos/the-250.mp4",
    poster: "/videos/posters/the-250.jpg",
    tweet: "2053154598316384319",
    blurb:
      "Aged Dominican Churchills rolled to celebrate 250 years of the Republic. Smoke some now. Save some for the Fourth.",
    notes:
      "Cedar, toasted almond, light baking spice, a long clean finish. Built for long conversations and July evenings.",
    story:
      "A small limited edition of 1,000 cigars. Aged Dominican filler finished in a premium Habano wrapper and banded with the Capitol / 250 mark. Bundles of 10 ship when the bell rings.",
    featured: true,
  },
  {
    id: "blockbuster",
    name: "Blockbuster",
    category: "house",
    brand: "Cigar Concierge",
    tag: "House Favorite",
    badge: "limited",
    format: "Box of 10",
    wrapper: "Cigar Concierge private blend",
    origin: "Dominican Republic",
    strength: "Medium-Full",
    price: 185,
    unit: "box of 10",
    stock: "Almost gone",
    availability: "low",
    image: "/catalog/blockbuster-lit.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/blockbuster-lit.jpg", "/catalog/house-bands.jpg"],
    video: "/videos/blockbuster.mp4",
    poster: "/videos/posters/blockbuster.jpg",
    tweet: "2066382862140817882",
    blurb: "By a considerable margin, the favorite house release. 100/100 smooth.",
    notes:
      "Silk draw, cocoa, roasted coffee, a little cream, zero harshness. The cigar you hand a friend when you want them to understand the house style.",
    story:
      "Life’s too short to smoke bullshit cigars. Blockbuster is the blend the Concierge keeps reaching for — and the one clients write back about.",
    featured: true,
  },
  {
    id: "dawgfather",
    name: "The Dawgfather",
    category: "house",
    brand: "Cigar Concierge",
    tag: "Husky Nation LE",
    badge: "limited",
    format: "Pigtail Toro · box of 10",
    wrapper: "Maduro",
    origin: "Dominican Republic",
    strength: "Medium-Full",
    price: 185,
    unit: "box of 10",
    stock: "In stock — very limited",
    availability: "limited",
    image: "/catalog/dawgfather-box.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/dawgfather-box.jpg", "/catalog/dawgfather-lid.jpg"],
    video: "/videos/dawgfather.mp4",
    poster: "/videos/posters/dawgfather.jpg",
    tweet: "2093038501113868373",
    blurb:
      "Highly aged Dominican filler and binder under a smooth, flavorful Maduro. Rolled pigtail toro for Husky nation.",
    notes:
      "Dark chocolate, espresso, leather, a sweet maduro edge. Built for night games and porch victories.",
    story:
      "Say who, say what. A purple-reign box for people who bleed Montlake. Limited production, allocated first to clients who already know the bell.",
    featured: true,
  },
  {
    id: "spacemob",
    name: "SpaceMob",
    category: "house",
    brand: "Cigar Concierge",
    tag: "Community Blend",
    badge: "limited",
    format: "Bundle of 10",
    wrapper: "Aged Dominican",
    origin: "Dominican Republic — house factory",
    strength: "Medium",
    price: 160,
    unit: "bundle of 10",
    stock: "Available",
    availability: "in_stock",
    image: "/catalog/spacemob-band.jpg",
    width: 1200,
    height: 442,
    gallery: ["/catalog/spacemob-band.jpg", "/catalog/house-bands.jpg"],
    video: "/videos/summer-sneak.mp4",
    poster: "/videos/posters/summer-sneak.jpg",
    tweet: "2072143094821298378",
    blurb:
      "Aged Dominican cigars manufactured at the house factory. The only retail group with its own stick.",
    notes:
      "Earthy Dominican core, honeyed cedar, a slow evolving mid-smoke. Celebratory without being loud.",
    story:
      "Rolled for milestones — batch shipments, long nights on the thesis, and people who like their cigars with a private joke on the band.",
    featured: true,
  },
  {
    id: "pigtail-toro",
    name: "Pigtail Toro",
    category: "house",
    brand: "Cigar Concierge",
    tag: "House Blend",
    badge: "limited",
    format: "Pigtail Toro · bundle of 10",
    wrapper: "House selection",
    origin: "Dominican Republic",
    strength: "Medium",
    price: 160,
    unit: "bundle of 10",
    stock: "Low — about 10 bundles",
    availability: "low",
    image: "/catalog/house-bands.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/house-bands.jpg", "/catalog/blockbuster-lit.jpg"],
    video: "/videos/summer-sneak.mp4",
    poster: "/videos/posters/summer-sneak.jpg",
    tweet: "2052922041188454735",
    blurb: "A nuanced profile that evolves from first light to the nub. Utterly magnificent.",
    notes:
      "Opens sweet and floral, turns to toasted nuts and baking spice, finishes long and clean. Easy draw, serious construction.",
    story:
      "The everyday-special stick. Same factory, same obsession with aged Dominican leaf, finished in the signature pigtail cap.",
    featured: true,
  },
  {
    id: "opus-x-25",
    name: "Opus X 25th Anniversary",
    category: "vault",
    brand: "Arturo Fuente",
    tag: "Allocated Vault",
    badge: "vault",
    format: "Box",
    wrapper: "Dominican Rosado",
    origin: "Dominican Republic · Chateau de la Fuente",
    strength: "Full",
    price: null,
    unit: "box — inquire",
    stock: "Rare — when allocated",
    availability: "allocated",
    image: "/catalog/opus-x-25.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/opus-x-25.jpg", "/catalog/opus-lineup.jpg"],
    tweet: "2027241895093752009",
    blurb: "More of a transformational experience than a cigar. One of Carlito Fuente’s masterpieces.",
    notes:
      "Pepper, dark fruit, cedar, that unmistakable Opus sweetness. A special-occasion smoke that actually deserves the phrase.",
    story:
      "Nobody has rare cigars like Cigar Concierge. When a 25th Anniversary box lands, it does not sit. Request allocation.",
    featured: true,
  },
  {
    id: "opus-baby-shark",
    name: "Opus X Shark 77",
    category: "vault",
    brand: "Arturo Fuente",
    tag: "Allocated Vault",
    badge: "vault",
    format: "Box of 30",
    wrapper: "Dominican Rosado",
    origin: "Dominican Republic",
    strength: "Full",
    price: null,
    unit: "box of 30 — inquire",
    stock: "Allocated",
    availability: "allocated",
    image: "/catalog/opus-baby-shark.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/opus-baby-shark.jpg", "/catalog/opus-lineup.jpg"],
    blurb: "Baby Shark 77 Opus X. The red-felt box people screenshot.",
    notes:
      "Classic Fuente spice over a rich, oily wrapper. Shark vitola changes the burn and the drama.",
    story: "Vault piece. Boxes move through the concierge list — not a public shelf.",
    featured: false,
  },
  {
    id: "opus-phantom",
    name: "2009 Opus X Forbidden Phantom",
    category: "vault",
    brand: "Arturo Fuente",
    tag: "Aged Vault",
    badge: "vault",
    format: "Single coffin",
    wrapper: "Dominican Rosado",
    origin: "Dominican Republic",
    strength: "Full",
    price: null,
    unit: "single — inquire",
    stock: "Aged inventory",
    availability: "inquire",
    image: "/catalog/opus-phantom.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/opus-phantom.jpg", "/catalog/opus-lineup.jpg"],
    tweet: "2088470888232661073",
    blurb: "A 2009 Forbidden X Lancero in the original wooden coffin.",
    notes:
      "Time has rounded the pepper into cocoa, cedar, and a dry champagne finish. Serious collector smoke.",
    story:
      "Aged inventory is the concierge edge. This is what seventeen years in the right humidor does.",
    featured: false,
  },
  {
    id: "davidoff-100",
    name: "Davidoff 100th Diadema Fina",
    category: "vault",
    brand: "Davidoff",
    tag: "Aged Vault",
    badge: "vault",
    format: "Diadema Fina",
    wrapper: "Ecuadorian / Dominican",
    origin: "Dominican Republic",
    strength: "Medium",
    price: null,
    unit: "inquire",
    stock: "Ultra rare",
    availability: "inquire",
    image: "/catalog/davidoff-100.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/davidoff-100.jpg", "/catalog/davidoff-35.jpg"],
    tweet: "2091379854424015016",
    blurb: "Best Davidoff of all time. 2006 100th Anniversary Diadema Fina. Unreal.",
    notes:
      "Cream, white pepper, roasted nuts, a polished davidoff sweetness that only age unlocks.",
    story:
      "The box art alone is a museum piece. The cigar is why people stay on the list.",
    featured: false,
  },
  {
    id: "davidoff-35",
    name: "Davidoff 35th Anniversary LE",
    category: "vault",
    brand: "Davidoff",
    tag: "20-Year Aged",
    badge: "vault",
    format: "Limited Edition box",
    wrapper: "Aged Davidoff",
    origin: "Dominican Republic",
    strength: "Medium",
    price: null,
    unit: "box — inquire",
    stock: "A few boxes",
    availability: "limited",
    image: "/catalog/davidoff-35.jpg",
    width: 702,
    height: 1200,
    gallery: ["/catalog/davidoff-35.jpg", "/catalog/davidoff-100.jpg"],
    tweet: "2027153071504265352",
    blurb: "20-year aged 2006 Limited Edition. Look at how yellow the bands are.",
    notes: "Honey, cedar, light leather, that aged-band aroma before you even cut it.",
    story:
      "Special edition for Old Virginia Tobacco Company. Yellowed bands, correct storage, no stories needed.",
    featured: false,
  },
  {
    id: "davidoff-rooster",
    name: "Davidoff Limited Edition Rooster",
    category: "vault",
    brand: "Davidoff",
    tag: "Limited Edition",
    badge: "vault",
    format: "Limited Edition",
    wrapper: "Dark Ecuadorian",
    origin: "Dominican Republic",
    strength: "Medium-Full",
    price: null,
    unit: "inquire",
    stock: "Allocated",
    availability: "allocated",
    image: "/catalog/davidoff-rooster.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/davidoff-rooster.jpg"],
    tweet: "2087386172406510077",
    blurb: "Davidoff Limited Edition Rooster. Life’s too short to smoke bullshit cigars.",
    notes:
      "Baking spice, cocoa, a little red fruit on a darker wrapper than the classic Davidoff profile.",
    story:
      "A holiday / year-of-the-rooster special that almost never hits a regular humidor.",
    featured: false,
  },
  {
    id: "padron-1964",
    name: "1999 Padrón 1964 Imperiales",
    category: "vault",
    brand: "Padrón",
    tag: "Aged Box",
    badge: "vault",
    format: "Box of 25",
    wrapper: "Nicaraguan Natural",
    origin: "Nicaragua",
    strength: "Full",
    price: null,
    unit: "box of 25 — inquire",
    stock: "Aged box available",
    availability: "inquire",
    image: "/catalog/padron-1964.jpg",
    width: 900,
    height: 1200,
    gallery: ["/catalog/padron-1964.jpg", "/catalog/padron-50.jpg"],
    tweet: "2050705156115988797",
    blurb: "A 1999 box of 1964 Anniversary Imperiales. That is not a typo.",
    notes:
      "Cocoa, roasted espresso, earth, a Padrón oil sheen. Age has made it velvety rather than sharp.",
    story:
      "Buying new 1964s is easy. Buying a box that has been quietly aging since 1999 is why the concierge exists.",
    featured: false,
  },
  {
    id: "padron-50",
    name: "Padrón 50th Natural",
    category: "vault",
    brand: "Padrón",
    tag: "Allocated",
    badge: "vault",
    format: "3-packs",
    wrapper: "Nicaraguan Natural",
    origin: "Nicaragua",
    strength: "Full",
    price: null,
    unit: "3-pack — inquire",
    stock: "3 packs available",
    availability: "low",
    image: "/catalog/padron-50.jpg",
    width: 1200,
    height: 900,
    gallery: ["/catalog/padron-50.jpg"],
    tweet: "2027026423836266726",
    blurb: "Padrón 50 Natural. Three packs on the list.",
    notes:
      "Classic anniversary-series density: chocolate, coffee, a little pepper on the retrohale.",
    story: "When the 50ths show up they do not linger. Request the pack.",
    featured: false,
  },
  {
    id: "opus-lineup",
    name: "Fuente Opus X Allocation",
    category: "vault",
    brand: "Arturo Fuente",
    tag: "Concierge Sourcing",
    badge: "vault",
    format: "By request",
    wrapper: "Varies",
    origin: "Dominican Republic",
    strength: "Full",
    price: null,
    unit: "inquire",
    stock: "Rotating",
    availability: "allocated",
    image: "/catalog/opus-lineup.jpg",
    width: 400,
    height: 400,
    gallery: [
      "/catalog/opus-lineup.jpg",
      "/catalog/opus-x-25.jpg",
      "/catalog/opus-baby-shark.jpg",
    ],
    blurb:
      "Perfecxion, Belicoso XXX, Reserva d’Chateau, Forbidden, Amor del Destino — sourced as they surface.",
    notes: "Tell the concierge the vitola and the year. The list does the rest.",
    story:
      "The profile picture is the promise: the rare Fuente bench, in house, not in a catalog screenshot from 2014.",
    featured: false,
  },
];

export const products: Product[] = ProductSchema.array().parse(rawProducts);

export const journalVideos: JournalVideo[] = VideoSchema.array().parse([
  {
    id: "dawgfather",
    title: "The Dawgfather is in stock",
    src: "/videos/dawgfather.mp4",
    poster: "/videos/posters/dawgfather.jpg",
    tweet: "2093038501113868373",
    copy: "Maduro pigtail toro. Boxes of 10 — $185. Husky nation only.",
    productId: "dawgfather",
  },
  {
    id: "blockbuster",
    title: "Blockbuster — summer preorder",
    src: "/videos/blockbuster.mp4",
    poster: "/videos/posters/blockbuster.jpg",
    tweet: "2066382862140817882",
    copy: "Boxes of 10 on preorder. $185. The house favorite.",
    productId: "blockbuster",
  },
  {
    id: "the-250",
    title: "The 250 being banded",
    src: "/videos/the-250.mp4",
    poster: "/videos/posters/the-250.jpg",
    tweet: "2053154598316384319",
    copy: "1,000 produced. Aged Dominican Churchills for the country’s birthday.",
    productId: "the-250",
  },
  {
    id: "summer-sneak",
    title: "Summer sneak peek",
    src: "/videos/summer-sneak.mp4",
    poster: "/videos/posters/summer-sneak.jpg",
    tweet: "2054596534646587681",
    copy: "A look at the warm-weather house cigar before it hit the list.",
  },
]);

export const tweetEmbeds = [
  { id: "2093038501113868373", title: "Dawgfather drop" },
  { id: "2066382862140817882", title: "Blockbuster preorder" },
  { id: "2053154598316384319", title: "The 250 — half presold" },
  { id: "2054596534646587681", title: "Summer sneak peek" },
  { id: "2078703927139438797", title: "Blockbuster, favorite release" },
  { id: "2074929499934978194", title: "SpaceMob aged Dominican" },
  { id: "2072143094821298378", title: "SpaceMob in production" },
  { id: "2052922041188454735", title: "Pigtail Toro bundles" },
] as const;

const byId = new Map(products.map((p) => [p.id, p]));

export function getProduct(id: string) {
  return byId.get(id);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}

export function relatedProducts(product: Product, limit = 3) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function filterCatalog(opts: {
  cat?: "all" | Category;
  q?: string;
  strength?: Product["strength"] | "all";
}) {
  const q = (opts.q ?? "").trim().toLowerCase();
  return products.filter((p) => {
    if (opts.cat && opts.cat !== "all" && p.category !== opts.cat) return false;
    if (opts.strength && opts.strength !== "all" && p.strength !== opts.strength)
      return false;
    if (!q) return true;
    const hay = `${p.name} ${p.brand} ${p.blurb} ${p.notes} ${p.wrapper} ${p.format}`.toLowerCase();
    return hay.includes(q);
  });
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  in_stock: "On the list",
  limited: "Limited",
  low: "Almost gone",
  allocated: "Allocated",
  inquire: "Price on request",
};

export const PAIRINGS: Record<string, string> = {
  "the-250": "Bourbon on a cedar porch. Save two for the Fourth.",
  blockbuster:
    "Espresso after dinner. The weeknight stick that still feels like an event.",
  dawgfather: "Dark rum and a night game. Purple Reign energy.",
  spacemob: "Honeyed tea, long nights, a private joke on the band.",
  "pigtail-toro": "Light whiskey on a Tuesday. First light to the nub.",
  "opus-x-25": "Single malt. No phones. One of Carlito’s masterpieces.",
  "opus-baby-shark": "After-dinner silence. The red-felt box people screenshot.",
  "opus-phantom": "Dry champagne. Seventeen years in the right humidor.",
  "davidoff-100":
    "Cognac. The box art is a museum piece; the cigar is why you stay on the list.",
  "davidoff-35": "Port. Yellowed bands, twenty years, no stories needed.",
  "davidoff-rooster":
    "Baking-spice rum. Year of the rooster — not a regular humidor.",
  "padron-1964": "Roasted espresso. A 1999 box. That is not a typo.",
  "padron-50": "Coffee, three-pack night. They do not linger.",
  "opus-lineup": "Tell the desk the vitola and the year. The list does the rest.",
};

export function pairingFor(id: string) {
  return PAIRINGS[id] ?? "Ask the desk.";
}

export function suggestProducts(q: string, limit = 6) {
  const query = q.trim();
  if (query.length < 2) return [];
  return filterCatalog({ q: query }).slice(0, limit);
}

export function productsByIds(ids: string[]) {
  return ids
    .map((id) => byId.get(id))
    .filter((p): p is Product => Boolean(p));
}
