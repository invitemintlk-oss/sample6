"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { C, F, invitation as inv } from "../data";
import { Reveal } from "./ui";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    Days: Math.floor(ms / 86_400_000),
    Hours: Math.floor(ms / 3_600_000) % 24,
    Minutes: Math.floor(ms / 60_000) % 60,
    Seconds: Math.floor(ms / 1000) % 60,
  };
}

export default function Countdown() {
  const target = new Date(inv.weddingStart).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <section id="countdown" className="relative overflow-hidden text-center" style={{ color: C.cream }}>
      <div
        className="relative px-6 py-16 sm:py-24"
        style={{
          background:
            "radial-gradient(130% 95% at 50% 0%, rgba(143,170,203,0.28) 0%, transparent 58%), radial-gradient(95% 75% at 50% 122%, rgba(199,162,75,0.18) 0%, transparent 60%), linear-gradient(135deg,#3D5A80 0%,#23395B 100%)",
          borderTop: "1px solid rgba(216,190,132,0.45)",
          borderBottom: "1px solid rgba(216,190,132,0.45)",
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 rounded-[6px] sm:inset-5" style={{ border: "1px solid rgba(216,190,132,0.32)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/eucalyptus-seal/countdown-floral.webp"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute bottom-0 left-1/2 w-[min(116%,900px)] -translate-x-1/2 select-none"
          style={{ opacity: 0.33 }}
        />
        <Reveal className="relative mx-auto max-w-4xl">
          <div style={{ fontFamily: F.script, color: C.goldLight, fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>We are getting</div>
          <h2 className="uppercase tracking-[0.26em]" style={{ fontFamily: F.serif, fontWeight: 600, fontSize: "clamp(1.7rem,3.8vw,2.8rem)" }}>
            Married
          </h2>
          <div className="mx-auto mb-9 mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-12" style={{ background: "linear-gradient(90deg,transparent,rgba(216,190,132,0.9))" }} />
            <span style={{ color: C.gold, fontSize: 12 }}>✦</span>
            <span className="h-px w-12" style={{ background: "linear-gradient(-90deg,transparent,rgba(216,190,132,0.9))" }} />
          </div>

          <div className="mx-auto grid max-w-lg grid-cols-4 gap-2.5 sm:gap-4">
            {(["Days", "Hours", "Minutes", "Seconds"] as const).map((unit) => {
              const v = t ? String(t[unit]).padStart(2, "0") : "00";
              return (
                <div
                  key={unit}
                  className="relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-xl px-1 sm:rounded-2xl"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,253,248,0.17) 0%, rgba(255,253,248,0.045) 100%)",
                    border: "1px solid rgba(216,190,132,0.5)",
                    boxShadow: "0 16px 34px rgba(20,8,16,0.30), inset 0 1px 0 rgba(255,255,255,0.22)",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",
                  }}
                >
                  <span className="relative block h-[1em] leading-none" style={{ fontSize: "clamp(1.7rem,6.5vw,3.4rem)", transform: "translateY(-5px)" }}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={v}
                        className="block tabular-nums leading-none"
                        style={{ fontFamily: F.serif, fontWeight: 600, color: "#FBF6EA", opacity: t ? 1 : 0.55 }}
                        initial={{ y: "-60%", opacity: 0 }}
                        animate={{ y: 0, opacity: t ? 1 : 0.55 }}
                        exit={{ y: "60%", opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        {v}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="my-2 h-px w-6 sm:my-2.5 sm:w-8" style={{ background: "rgba(216,190,132,0.7)" }} aria-hidden="true" />
                  <span
                    className="text-[0.5rem] uppercase tracking-[0.12em] sm:text-[0.62rem] sm:tracking-[0.24em]"
                    style={{ fontFamily: F.sans, color: C.goldLight }}
                  >
                    {unit}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-7 text-[0.72rem] uppercase tracking-[0.32em]" style={{ fontFamily: F.sans, color: "rgba(246, 239, 221, 0.78)" }}>
            Until {inv.dateLong}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
