import { FormEvent, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Corners } from "@/components/corners";
import { Kicker } from "@/components/section-head";
import { isRestrictedShipTo, US_STATES } from "@/data/shipping";
import { buildDeskMessage, xDmUrl, xProfileUrl } from "@/lib/x";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact — Cigar Concierge" }] }),
});

const WANTS = [
  "House blend bundle / box",
  "Vault allocation",
  "Private label / custom band",
  "Something rare you didn’t see listed",
];

function ContactPage() {
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function fail(msg: string) {
    setError(msg);
    const el = formRef.current;
    if (!el) return;
    el.classList.remove("field-shake");
    void el.offsetWidth;
    el.classList.add("field-shake");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const handle = String(fd.get("handle") ?? "").trim();
    const want = String(fd.get("want") ?? "");
    const state = String(fd.get("state") ?? "");
    const notes = String(fd.get("notes") ?? "");
    const age = fd.get("age") === "on";

    if (name.length < 2) {
      fail("Name is required.");
      return;
    }
    if (!age) {
      fail("Confirm you are 21 or older.");
      return;
    }
    if (state && isRestrictedShipTo(state)) {
      fail(
        "The desk does not auto-confirm tobacco to this state. Message @SeattleCigars directly if you need an exception.",
      );
      return;
    }
    setError(null);
    const text = buildDeskMessage({
      name,
      handle,
      state,
      lines: [want],
      notes,
    });
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Message copied. Opening X…");
    } catch {
      toast.error("Copy blocked — paste from the request list instead.");
    }
    window.open(xDmUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="py-16">
      <div className="container-cc grid items-start gap-12 md:grid-cols-2">
        <div>
          <Kicker>The bell</Kicker>
          <h1 className="mt-2 font-serif text-5xl">Ring it on X.</h1>
          <div className="gold-rule gold-rule-left is-in my-4" />
          <p className="mt-4 text-muted">
            Real orders are taken by @SeattleCigars. This form stores nothing on
            a server — it builds the message you paste into a DM.
          </p>
          <form
            ref={formRef}
            className="surface-static mt-8 grid gap-4 p-6"
            onSubmit={onSubmit}
            noValidate
          >
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="field"
                placeholder="Your name"
              />
            </Field>
            <Field label="X handle" htmlFor="handle">
              <input
                id="handle"
                name="handle"
                autoComplete="username"
                className="field"
                placeholder="@handle"
              />
            </Field>
            <Field label="What do you want" htmlFor="want">
              <select id="want" name="want" className="field">
                {WANTS.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </Field>
            <Field label="Ship-to state" htmlFor="state">
              <select id="state" name="state" className="field" defaultValue="WA">
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Notes" htmlFor="notes">
              <textarea
                id="notes"
                name="notes"
                rows={5}
                className="field"
                placeholder="Box of Blockbuster + bundle of The 250. Ship to…"
              />
            </Field>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                name="age"
                className="mt-1 size-4 accent-navy"
                required
              />
              I confirm I am 21 or older and understand adult-signature shipping.
            </label>
            {error ? (
              <p className="text-sm text-danger" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit">Copy message & open X</Button>
          </form>
          <p className="mt-4 text-sm text-muted">
            Direct:{" "}
            <a
              className="text-link"
              href={xProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              x.com/SeattleCigars
            </a>
          </p>
        </div>
        <div className="media-zoom relative min-h-80">
          <img
            src="/catalog/seattle-skyline.jpg"
            alt="Seattle evening skyline"
            width={1500}
            height={499}
            className="media-frame h-full min-h-80 w-full object-cover"
          />
          <Corners />
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs tracking-[0.1em] text-muted uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
