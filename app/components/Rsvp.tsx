"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { useState } from "react";
import { C, F, invitation as inv } from "../data";
import { Reveal } from "./ui";

const label = "text-[0.68rem] uppercase tracking-[0.18em]";
const border = "1px solid rgba(199, 162, 75, 0.45)";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) return setError("Please let us know if you can attend.");
    setError("");
    // TODO: send { name, attending, guests } to your backend here
    setSent(true);
  };

  return (
    <section id="rsvp" className="px-6 py-16 sm:px-7 sm:py-24" style={{ background: "rgba(241, 231, 207, 0.55)" }}>
      <Reveal className="mx-auto max-w-xl text-center">
        <span className="mb-3 block text-[0.72rem] uppercase tracking-[0.34em]" style={{ fontFamily: F.sans, color: C.gold }}>
          Kindly reply
        </span>
        <h2
          className="mb-4 leading-tight"
          style={{ fontFamily: F.deco, color: C.green, fontWeight: 600, fontSize: "clamp(1.5rem,3.6vw,2.5rem)", letterSpacing: "0.07em" }}
        >
          WILL YOU <span style={{ color: C.gold }}>JOIN US</span>
        </h2>
        <p className="mx-auto mb-3 max-w-[46ch]" style={{ color: C.muted }}>
          Your presence is the greatest gift. Please let us know if you will be joining us.
        </p>
        <p className="mb-9 text-[0.7rem] uppercase tracking-[0.26em]" style={{ fontFamily: F.sans, color: C.gold }}>
          {inv.rsvpBy}
        </p>

        <form
          onSubmit={submit}
          className="rounded-[150px_150px_20px_20px] px-6 pb-10 pt-24 text-left sm:rounded-[260px_260px_22px_22px] sm:px-12 sm:pb-12 sm:pt-[150px]"
          style={{ background: C.card, border: "1px solid rgba(199, 162, 75, 0.35)", boxShadow: "0 30px 60px -40px rgba(70,40,30,0.4)" }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3 py-6 text-center">
                <Heart className="h-9 w-9 fill-current" style={{ color: C.gold }} aria-hidden />
                <p style={{ fontFamily: F.script, color: C.green, fontSize: "2.2rem", lineHeight: 1 }}>Thank you{name ? `, ${name.split(" ")[0]}` : ""}</p>
                <p style={{ color: C.muted }}>
                  {attending ? `We can't wait to celebrate with you${guests > 1 ? ` and your party of ${guests}` : ""}!` : "You will be missed — thank you for letting us know."}
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" exit={{ opacity: 0 }}>
                <div className="mb-5 flex flex-col gap-1.5">
                  <label htmlFor="lv-name" className={label} style={{ fontFamily: F.sans, color: C.gold }}>
                    Full name
                  </label>
                  <input
                    id="lv-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 focus:outline-none"
                    style={{ fontFamily: F.body, background: C.bg, border, borderRadius: 10, color: C.ink }}
                  />
                </div>

                <div className="mb-5">
                  <p className={`mb-2.5 ${label}`} style={{ fontFamily: F.sans, color: C.gold }}>
                    Will you attend?
                  </p>
                  <div className="flex gap-3">
                    {[
                      { v: true, t: "Joyfully accepts" },
                      { v: false, t: "Regretfully declines" },
                    ].map((o) => {
                      const on = attending === o.v;
                      return (
                        <button
                          key={o.t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setAttending(o.v)}
                          className="flex-1 px-3 py-3.5 text-center transition-colors"
                          style={{
                            borderRadius: 10,
                            border: on ? `1px solid ${C.green}` : border,
                            background: on ? C.green : "transparent",
                            color: on ? C.cream : C.muted,
                            fontFamily: F.body,
                          }}
                        >
                          {o.t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-5">
                  <p className={`mb-2.5 ${label}`} style={{ fontFamily: F.sans, color: C.gold }}>
                    Number of guests
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <CountBtn label="Decrease guest count" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1}>
                      -
                    </CountBtn>
                    <span className="leading-none" style={{ fontFamily: F.serif, color: C.green, fontSize: "2.6rem", minWidth: "3rem", textAlign: "center" }}>
                      {guests}
                    </span>
                    <CountBtn label="Increase guest count" onClick={() => setGuests((g) => Math.min(inv.maxGuests, g + 1))} disabled={guests >= inv.maxGuests}>
                      +
                    </CountBtn>
                  </div>
                </div>

                {error && (
                  <p className="mb-4 text-center text-sm" style={{ color: "#a0453a" }} role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-[0.8rem] font-semibold uppercase tracking-[0.22em] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
                  style={{ fontFamily: F.sans, background: "linear-gradient(135deg,#5477A0,#2E4A70)", color: C.cream, boxShadow: "0 14px 30px -12px rgba(35,57,91,0.55)" }}
                >
                  <Send className="h-3.5 w-3.5" aria-hidden />
                  Send our RSVP
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Reveal>
    </section>
  );
}

function CountBtn({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-11 w-11 place-items-center rounded-full text-xl transition-all hover:opacity-80 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
      style={{ background: "rgba(61, 90, 128, 0.1)", color: C.green, border: "1px solid rgba(199, 162, 75, 0.5)" }}
    >
      {children}
    </button>
  );
}
