import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct } from "@/data/catalog";

const AGE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const COMPARE_MAX = 3;
const VIEWED_MAX = 6;

export type LineItem = { id: string; qty: number };

type DeskState = {
  hydrated: boolean;
  ageOk: boolean;
  ageAt: number | null;
  items: LineItem[];
  compareIds: string[];
  viewedIds: string[];
  drawerOpen: boolean;
  markHydrated: () => void;
  confirmAge: () => void;
  declineAge: () => void;
  addItem: (id: string, qty?: number) => boolean;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleCompare: (id: string) => boolean;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  markViewed: (id: string) => void;
};

function prune(items: LineItem[]): LineItem[] {
  return items
    .map((item) => ({
      id: item.id,
      qty: Math.max(1, Math.min(24, Math.floor(Number(item.qty) || 1))),
    }))
    .filter((item) => Boolean(getProduct(item.id)));
}

function pruneIds(ids: string[] | undefined, max: number) {
  const seen = new Set<string>();
  const next: string[] = [];
  for (const id of ids ?? []) {
    if (!getProduct(id) || seen.has(id)) continue;
    seen.add(id);
    next.push(id);
    if (next.length >= max) break;
  }
  return next;
}

export const useDesk = create<DeskState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      ageOk: false,
      ageAt: null,
      items: [],
      compareIds: [],
      viewedIds: [],
      drawerOpen: false,
      markHydrated: () => {
        const { ageOk, ageAt, items, compareIds, viewedIds } = get();
        const fresh = Boolean(ageOk && ageAt && Date.now() - ageAt < AGE_TTL_MS);
        set({
          hydrated: true,
          ageOk: fresh,
          ageAt: fresh ? ageAt : null,
          items: prune(items),
          compareIds: pruneIds(compareIds, COMPARE_MAX),
          viewedIds: pruneIds(viewedIds, VIEWED_MAX),
        });
      },
      confirmAge: () => set({ ageOk: true, ageAt: Date.now() }),
      declineAge: () => set({ ageOk: false, ageAt: null }),
      addItem: (id, qty = 1) => {
        if (!getProduct(id)) return false;
        const next = prune(get().items);
        const hit = next.find((i) => i.id === id);
        if (hit) hit.qty = Math.min(24, hit.qty + qty);
        else next.push({ id, qty: Math.max(1, qty) });
        set({ items: next, drawerOpen: true });
        return true;
      },
      setQty: (id, qty) => {
        set({
          items: prune(
            get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
          ),
        });
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleCompare: (id) => {
        if (!getProduct(id)) return false;
        const cur = get().compareIds;
        if (cur.includes(id)) {
          set({ compareIds: cur.filter((x) => x !== id) });
          return true;
        }
        if (cur.length >= COMPARE_MAX) return false;
        set({ compareIds: [...cur, id] });
        return true;
      },
      removeCompare: (id) =>
        set({ compareIds: get().compareIds.filter((x) => x !== id) }),
      clearCompare: () => set({ compareIds: [] }),
      markViewed: (id) => {
        if (!getProduct(id)) return;
        set({
          viewedIds: pruneIds([id, ...get().viewedIds], VIEWED_MAX),
        });
      },
    }),
    {
      name: "cc-desk-v2",
      skipHydration: true,
      partialize: (s) => ({
        ageOk: s.ageOk,
        ageAt: s.ageAt,
        items: s.items,
        compareIds: s.compareIds,
        viewedIds: s.viewedIds,
      }),
    },
  ),
);

export function itemCount(items: LineItem[]) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function knownSubtotal(items: LineItem[]) {
  return items.reduce((n, i) => {
    const p = getProduct(i.id);
    return n + (p?.price ? p.price * i.qty : 0);
  }, 0);
}