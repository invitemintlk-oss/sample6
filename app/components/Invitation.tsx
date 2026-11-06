"use client";

import { motion } from "framer-motion";
import { MapPin, Shirt, Utensils } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { C, F, invitation as inv } from "../data";
import Countdown from "./Countdown";
import Curtain from "./Curtain";
import IntroVideo from "./IntroVideo";
import Rsvp from "./Rsvp";
import SaveTheDate from "./SaveTheDate";
import { archCard, DiamondDivider, Photo, Reveal, RingsIcon, SectionTitle } from "./ui";

const NAV = [
  { id: "hero", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "events", label: "Details" },
  { id: "rsvp", label: "RSVP" },
  { id: "venue", label: "Location" },
];

// [left %, size px, fall s, delay s, sway s, colour, opacity]
const PETALS: [number, number, number, number, number, string, number][] = [
  [4, 13, 15, 0, 4.5, "#F6F1E6", 0.5],
  [12, 9, 19, 4, 5.5, "#EFE6D0", 0.4],
  [22, 16, 13, 7, 4, "#FBF4EA", 0.45],
  [31, 8, 21, 2, 6, "#E1EAF5", 0.35],
  [40, 12, 16, 9, 5, "#F6F1E6", 0.5],
  [49, 10, 18, 5, 4.5, "#EFE6D0", 0.4],
  [58, 15, 14, 11, 4, "#FBF4EA", 0.45],
  [66, 9, 20, 1, 6, "#E1EAF5", 0.35],
  [74, 13, 16, 8, 5, "#F6F1E6", 0.5],
  [82, 8, 22, 3, 5.5, "#EFE6D0", 0.35],
  [90, 14, 15, 6, 4, "#FBF4EA", 0.45],
  [96, 10, 18, 10, 5, "#E1EAF5", 0.4],
];

const mapQuery = encodeURIComponent(`${inv.venue.name}, ${inv.venue.address}`);
const ease = [0.22, 1, 0.36, 1] as const;

function Initials({ amp }: { amp: string }) {
  return (
    <>
      {inv.initials[0]}
      <span style={{ fontFamily: F.script, color: amp, fontSize: "1.1em", margin: "0 0.08em" }}>&amp;</span>
      {inv.initials[1]}
    </>
  );
}

export default function Invitation() {
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState("hero");
  const audio = useRef<HTMLAudioElement>(null);

  const open = () => {
    setOpened(true);
    audio.current?.play().catch(() => {});
  };

    // highlight the nav link for the section in view
  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), "dresscode", "countdown"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id === "dresscode" ? "events" : e.target.id === "countdown" ? "hero" : e.target.id;
          setActive(id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-clip"
      style={{
        backgroundColor: C.bg,
        color: C.ink,
        fontFamily: F.body,
        fontSize: 17,
        lineHeight: 1.6,
        backgroundImage:
          "radial-gradient(1200px 600px at 82% -6%, rgba(199, 162, 75, 0.1), transparent 60%), radial-gradient(900px 520px at -12% 26%, rgba(143, 170, 203, 0.12), transparent 60%)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        isolation: "isolate",
      }}
    >
      <audio ref={audio} src="/eucalyptus-seal/music.mp3" loop preload="auto" />
      <Curtain open={opened} onOpen={open} />
      <IntroVideo />

      {/* backdrops */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: -1,
          backgroundColor: "#EEF4FB",
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url(/eucalyptus-seal/backdrop-watercolor.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* falling petals */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 6 }}>
        {PETALS.map(([left, size, fall, delay, sway, color, opacity], i) => (
          <span key={i} className="absolute top-0" style={{ left: `${left}%`, animation: `lvPetalFall ${fall}s linear ${delay}s infinite` }}>
            <span
              className="block"
              style={{
                width: size,
                height: size,
                borderRadius: "52% 0 52% 52%",
                background: `radial-gradient(circle at 32% 28%, #ffffff, ${color})`,
                opacity,
                boxShadow: "0 1px 3px rgba(120,90,60,0.10)",
                animation: `lvPetalSway ${sway}s ease-in-out ${delay}s infinite alternate`,
              }}
            />
          </span>
        ))}
      </div>

      {/* header */}
      <header
        className="sticky top-0 z-[200] grid items-center gap-4 px-5 py-3.5 sm:px-10"
        style={{ gridTemplateColumns: "1fr auto 1fr", background: "rgba(251, 248, 241, 0.82)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(199, 162, 75, 0.28)" }}
      >
        <a
          href="#hero"
          aria-label={`${inv.bride} and ${inv.groom}`}
          className="col-[1/-1] justify-self-center leading-none md:col-auto md:justify-self-start"
          style={{ fontFamily: F.deco, color: C.green, fontSize: "1.4rem", letterSpacing: "0.08em" }}
        >
          <Initials amp={C.gold} />
        </a>
        <nav className="hidden justify-center gap-5 md:flex md:gap-7">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="whitespace-nowrap text-[0.74rem] uppercase tracking-[0.22em] transition-colors"
              style={{
                fontFamily: F.sans,
                color: active === n.id ? C.green : C.muted,
                borderBottom: `1px solid ${active === n.id ? C.gold : "transparent"}`,
                paddingBottom: 4,
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <span aria-hidden="true" />
      </header>

      {/* hero */}
      <div className="relative" style={{ zIndex: 2 }}>
        <section id="hero" className="relative mx-auto max-w-6xl px-6 pb-14 pt-10 sm:px-7 sm:pb-20 sm:pt-16">
          <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-12">
            <motion.div
              className="order-2 flex min-w-0 flex-col items-center gap-5 rounded-[36px] px-5 py-9 text-center sm:px-8 md:order-1"
              style={{
                background: "radial-gradient(ellipse 115% 92% at 50% 49%, rgba(251,248,241,0.94) 0%, rgba(251,248,241,0.86) 54%, rgba(251,248,241,0) 92%)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, delay: 0.9, ease }}
            >
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.34em]" style={{ fontFamily: F.sans, color: C.gold }}>
                Together with their families
              </span>
              <h2 className="my-1" style={{ fontFamily: F.deco, color: C.green, lineHeight: 1 }}>
                <span className="block uppercase tracking-[0.04em]" style={{ fontSize: "clamp(2.6rem, 7vw, 4.6rem)" }}>
                  {inv.bride}
                </span>
                <span className="my-1 block" style={{ fontFamily: F.script, color: C.sage, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", textTransform: "none" }}>
                  and
                </span>
                <span className="block uppercase tracking-[0.04em]" style={{ fontSize: "clamp(2.6rem, 7vw, 4.6rem)" }}>
                  {inv.groom}
                </span>
              </h2>
              <p className="max-w-[30ch] text-sm uppercase leading-[1.85] tracking-[0.15em] sm:text-[0.95rem]" style={{ color: C.ink, textWrap: "balance" }}>
                request the honour of your presence at the celebration of their marriage
              </p>
              <DiamondDivider />
              <p className="text-[0.95rem] uppercase tracking-[0.2em]" style={{ fontFamily: F.sans, color: C.green }}>
                {inv.dateLong}
              </p>
            </motion.div>

            <div className="order-1 flex min-w-0 justify-center md:order-2">
              <motion.div
                className="group relative w-[min(88%,380px)] overflow-hidden sm:w-[min(100%,440px)]"
                style={{
                  aspectRatio: "4 / 5",
                  borderRadius: "260px 260px 18px 18px",
                  border: "1px solid rgba(199, 162, 75, 0.4)",
                  boxShadow: "0 30px 60px -34px rgba(70,40,30,0.45)",
                  background: C.card,
                }}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={opened ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 1.1, delay: 0.7, ease }}
              >
                <Photo src={inv.heroPhoto} alt={`${inv.bride} and ${inv.groom}`} />
                <div aria-hidden="true" className="pointer-events-none absolute inset-2.5" style={{ borderRadius: "248px 248px 12px 12px", border: "1px solid rgba(199, 162, 75, 0.45)" }} />
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <Countdown />
      </div>

      {/* story */}
      <div className="relative" style={{ zIndex: 2 }}>
        <section id="story" className="mx-auto max-w-6xl px-6 py-16 sm:px-7 sm:py-24">
          <SectionTitle eyebrow="How It Began" first="OUR" accent="STORY" />
          <Reveal className="-mt-8 mb-12 text-center sm:-mt-12 sm:mb-16">
            <p style={{ color: C.muted }}>Two hearts, one beautiful journey.</p>
          </Reveal>
          <Reveal
            className="group relative mx-auto w-[min(88%,420px)] overflow-hidden"
            style={{ aspectRatio: "4 / 5", borderRadius: "260px 260px 18px 18px", border: "1px solid rgba(199, 162, 75, 0.35)", boxShadow: "0 30px 60px -34px rgba(70,40,30,0.45)", background: "#fff" }}
          >
            <Photo src={inv.storyPhoto} fit="contain" alt={`Illustration of ${inv.bride} and ${inv.groom}`} />
            <div aria-hidden="true" className="pointer-events-none absolute inset-2.5" style={{ borderRadius: "248px 248px 12px 12px", border: "1px solid rgba(199, 162, 75, 0.45)" }} />
          </Reveal>
        </section>
      </div>

      {/* events */}
      <div className="relative" style={{ zIndex: 2 }}>
        <section id="events" className="mx-auto max-w-6xl px-6 py-16 sm:px-7 sm:py-24">
          <SectionTitle eyebrow={inv.dateLong} first="THE" accent="DETAILS" />
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5 sm:gap-8">
            {inv.events.map((ev, i) => (
              <Reveal
                key={ev.title}
                y={22}
                delay={i * 0.15}
                className="group flex w-full flex-col items-center gap-2 px-8 pb-10 text-center sm:w-[calc((100%-2rem)/2)]"
                style={{ ...archCard, paddingTop: "clamp(54px,6vw,78px)" }}
              >
                <span
                  className="mb-1 grid h-16 w-16 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ border: `1px solid ${C.goldLight}`, background: C.bg, color: C.green }}
                >
                  {ev.icon === "rings" ? <RingsIcon /> : <Utensils className="h-7 w-7" strokeWidth={1.3} aria-hidden />}
                </span>
                <h3 style={{ fontFamily: F.marcellus, color: C.green, fontSize: "clamp(1.05rem,2.7vw,1.35rem)", lineHeight: 1.25, letterSpacing: "0.08em" }}>{ev.title}</h3>
                <div className="tracking-[0.06em]" style={{ fontFamily: F.marcellus, color: C.ink, fontSize: "clamp(0.95rem,2.4vw,1.1rem)" }}>
                  {ev.time}
                </div>
                <span className="my-1.5 h-px w-10" style={{ background: C.goldLight }} aria-hidden="true" />
                <p className="text-[0.96rem]" style={{ color: C.muted }}>
                  {ev.place}
                  <br />
                  {ev.detail}
                </p>
              </Reveal>
            ))}
          </div>
          <SaveTheDate />
        </section>
      </div>

      {/* dress code */}
      <div className="relative" style={{ zIndex: 2 }}>
        <section id="dresscode" className="mx-auto max-w-6xl px-6 py-16 sm:px-7 sm:py-24">
          <SectionTitle eyebrow="What to wear" first="DRESS" accent="CODE" />
          <Reveal
            className="mx-auto flex max-w-xl flex-col items-center gap-3 px-8 pb-10 text-center sm:px-12"
            style={{ ...archCard, paddingTop: "clamp(54px,6vw,78px)" }}
          >
            <span className="mb-1 grid h-16 w-16 place-items-center rounded-full" style={{ border: `1px solid ${C.goldLight}`, background: C.bg, color: C.green }}>
              <Shirt className="h-7 w-7" strokeWidth={1.3} aria-hidden />
            </span>
            <h3
              className="whitespace-pre-line"
              style={{ fontFamily: F.marcellus, color: C.green, fontSize: "clamp(1.1rem,2.9vw,1.45rem)", lineHeight: 1.3, letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              {inv.dressCode.title}
            </h3>
            <span className="my-1 h-px w-10" style={{ background: C.goldLight }} aria-hidden="true" />
            <p className="max-w-[40ch] whitespace-pre-line text-[0.98rem] leading-[1.7]" style={{ color: C.muted }}>
              {inv.dressCode.text}
            </p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4" aria-label="Colour palette for guests">
              {inv.dressCode.palette.map((c, i) => (
                <motion.li key={c} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}>
                  <span
                    className="block rounded-full"
                    role="img"
                    aria-label={c}
                    style={{
                      width: "clamp(30px, 10.5vw, 48px)",
                      height: "clamp(30px, 10.5vw, 48px)",
                      background: c,
                      border: "1px solid rgba(199, 162, 75, 0.4)",
                      boxShadow: "0 8px 16px -10px rgba(70,40,30,0.5), inset 0 1px 0 rgba(255,255,255,0.4)",
                    }}
                  />
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>

      {/* venue */}
      <div className="relative" style={{ zIndex: 2 }}>
        <section id="venue" className="mx-auto max-w-6xl px-6 py-16 sm:px-7 sm:py-24">
          <SectionTitle eyebrow="How to find us" first="THE" accent="LOCATION" />
          <Reveal className="grid items-stretch gap-5 sm:gap-8 md:grid-cols-[0.85fr_1.15fr]">
            <div className="flex flex-col justify-center">
              <div
                className="flex flex-col items-center gap-3 px-8 py-9 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left"
                style={{ background: C.card, border: "1px solid rgba(199, 162, 75, 0.3)", borderRadius: "90px 90px 18px 18px", boxShadow: "0 16px 36px -26px rgba(70,40,30,0.4)" }}
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full" style={{ border: `1px solid ${C.goldLight}`, color: C.green }}>
                  <MapPin className="h-7 w-7" strokeWidth={1.3} aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <span style={{ fontFamily: F.script, color: C.sage, fontSize: "1.5rem", lineHeight: 0.9 }}>Venue</span>
                  <h3 className="uppercase tracking-[0.08em]" style={{ fontFamily: F.marcellus, color: C.green, fontSize: "1.15rem" }}>
                    {inv.venue.name}
                  </h3>
                  <p className="text-[0.96rem]" style={{ color: C.muted }}>
                    {inv.venue.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative min-h-[300px] flex-1 overflow-hidden" style={{ borderRadius: 18, border: "1px solid rgba(199, 162, 75, 0.35)", boxShadow: "0 30px 60px -34px rgba(70,40,30,0.45)" }}>
                <iframe
                  title={`Map of ${inv.venue.name}`}
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                  style={{ filter: "grayscale(0.2) saturate(0.9)" }}
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 self-center rounded-full px-7 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{ fontFamily: F.sans, background: "linear-gradient(135deg,#5477A0,#2E4A70)", color: C.cream, boxShadow: "0 14px 26px -14px rgba(35,57,91,0.7)" }}
              >
                <MapPin className="h-4 w-4" strokeWidth={1.6} aria-hidden /> Open in Maps
              </a>
            </div>
          </Reveal>
        </section>
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <Rsvp />
      </div>

      {/* footer */}
      <div className="relative" style={{ zIndex: 2 }}>
        <section id="footer" className="mx-auto max-w-6xl px-6 py-12 sm:px-7 sm:py-20">
          <Reveal
            className="relative overflow-hidden px-7 py-14 text-center sm:px-16 sm:py-20"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, rgba(143,170,203,0.26) 0%, transparent 55%), radial-gradient(100% 78% at 50% 120%, rgba(199,162,75,0.2) 0%, transparent 60%), linear-gradient(165deg,#5477A0 0%,#23395B 100%)",
              color: C.cream,
              borderRadius: "clamp(40px,8vw,90px) clamp(40px,8vw,90px) 30px 30px",
              boxShadow: "0 40px 80px -44px rgba(70,40,30,0.6)",
              border: "1px solid rgba(216,190,132,0.45)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 sm:inset-5"
              style={{ borderRadius: "clamp(30px,7vw,78px) clamp(30px,7vw,78px) 20px 20px", border: "1px solid rgba(216,190,132,0.3)" }}
            />
            <div className="relative">
              <div
                className="mx-auto mb-8 w-[min(72%,280px)] overflow-hidden"
                style={{ aspectRatio: "2 / 3", borderRadius: "200px 200px 16px 16px", border: "1px solid rgba(216,190,132,0.6)", boxShadow: "0 24px 48px -24px rgba(10,16,30,0.7)", padding: 6, background: "rgba(255,253,248,0.12)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/save-the-date.webp"
                  alt={`Illustration of ${inv.bride} and ${inv.groom}`}
                  className="h-full w-full object-cover"
                  style={{ borderRadius: "194px 194px 11px 11px" }}
                />
              </div>
              <div className="text-[0.9rem] uppercase tracking-[0.4em]" style={{ fontFamily: F.sans, opacity: 0.9 }}>
                Save the date
              </div>
              <div className="my-3.5" style={{ fontFamily: F.serif, fontWeight: 500, fontSize: "clamp(2.6rem,10vw,6rem)", lineHeight: 1, letterSpacing: "0.04em" }}>
                {inv.dateShort}
              </div>
              <div className="mb-6" style={{ fontFamily: F.script, color: C.goldLight, fontSize: "clamp(1.7rem,4vw,2.5rem)" }}>
                Sealed with love.
              </div>
              <div style={{ fontFamily: F.deco, fontSize: "2rem", letterSpacing: "0.08em" }}>
                <Initials amp={C.goldLight} />
              </div>
              <div className="mt-1" style={{ fontFamily: F.deco, fontSize: "1.3rem", letterSpacing: "0.06em", color: "rgba(246, 239, 221, 0.92)" }}>
                {inv.bride} &amp; {inv.groom}
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
