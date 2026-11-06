"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { F, invitation as inv } from "../data";

/** Full-screen intro video shown before the curtain. Plays muted (browser autoplay rule); ends or skips into the curtain. */
export default function IntroVideo() {
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(true);
  const video = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    v.play().catch(() => {});
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[700] bg-black"
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
        >
          <video
            ref={video}
            src={inv.introVideo}
            className="h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setDone(true)}
            onError={() => setDone(true)}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 sm:p-7">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              className="grid h-11 w-11 place-items-center rounded-full text-white backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)" }}
            >
              {muted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => setDone(true)}
              className="rounded-full px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md"
              style={{ fontFamily: F.sans, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)" }}
            >
              Skip intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
