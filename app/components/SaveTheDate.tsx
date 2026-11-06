"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { C, F, invitation as inv } from "../data";

const title = `${inv.bride} & ${inv.groom}'s Wedding`;
const details = inv.events.map((e) => `${e.title} — ${e.time}, ${e.place}`).join("\n");
const location = `${inv.venue.name}, ${inv.venue.address}`;

const utc = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function googleUrl() {
  const p = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${utc(inv.weddingStart)}/${utc(inv.weddingEnd)}`, details, location });
  return `https://calendar.google.com/calendar/render?${p}`;
}
function outlookUrl() {
  const p = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: title,
    startdt: new Date(inv.weddingStart).toISOString(),
    enddt: new Date(inv.weddingEnd).toISOString(),
    body: details,
    location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${p}`;
}
function downloadIcs() {
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${utc(new Date().toISOString())}`,
    `DTSTART:${utc(inv.weddingStart)}`,
    `DTEND:${utc(inv.weddingEnd)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(details)}`,
    `LOCATION:${esc(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: "wedding.ics" });
  a.click();
  URL.revokeObjectURL(url);
}

const CalendarHeart = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
    <path d="M12 18c-2-1.3-3.4-2.6-3.4-4a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 1.4-1.4 2.7-3.4 4Z" />
  </svg>
);

export default function SaveTheDate() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const menuId = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const options = [
    { label: "Google Calendar", run: () => window.open(googleUrl(), "_blank", "noopener") },
    { label: "Apple Calendar", run: () => (downloadIcs(), flash("Calendar file downloaded")) },
    { label: "Outlook", run: () => window.open(outlookUrl(), "_blank", "noopener") },
    { label: "Download .ics", run: () => (downloadIcs(), flash("Calendar file downloaded")) },
  ];

  return (
    <div className="mx-auto mt-12 max-w-md">
      <div className="relative" ref={ref}>
        <div
          className="overflow-hidden rounded-2xl"
          style={{ background: C.card, border: "1px solid rgba(199, 162, 75, 0.4)", boxShadow: "0 18px 38px -28px rgba(61, 90, 128, 0.35)" }}
        >
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 sm:px-5"
            style={{ ["--tw-ring-color" as string]: "rgba(199, 162, 75, 0.6)" }}
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #3D5A80, #2E4A70)", color: C.cream }}>
              <CalendarHeart />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg leading-tight" style={{ fontFamily: F.marcellus, color: C.green }}>
                Save Our Date
              </span>
              <motion.span
                className="mt-0.5 block text-xs"
                style={{ color: "rgba(54, 64, 77, 0.65)" }}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Add the wedding to your calendar
              </motion.span>
            </span>
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(61, 90, 128, 0.06)" }} aria-hidden="true">
              <ChevronDown className="h-4 w-4 transition-transform duration-200" style={{ color: C.green, transform: open ? "rotate(180deg)" : "none" }} />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                id={menuId}
                role="menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
                style={{ borderTop: "1px solid rgba(199, 162, 75, 0.25)" }}
              >
                {options.map((o) => (
                  <li key={o.label} role="none">
                    <button
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        o.run();
                        setOpen(false);
                      }}
                      className="w-full px-5 py-3 text-left text-[0.95rem] transition-colors hover:bg-[#FBF8F1]"
                      style={{ fontFamily: F.marcellus, color: C.green }}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute inset-x-0 -top-3 flex justify-center" aria-live="polite" aria-atomic="true">
          <AnimatePresence>
            {toast && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: -8 }}
                exit={{ opacity: 0 }}
                className="rounded-full px-4 py-1.5 text-xs"
                style={{ fontFamily: F.sans, background: C.green, color: C.cream }}
              >
                {toast}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
