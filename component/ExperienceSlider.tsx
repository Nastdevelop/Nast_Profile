"use client";

import { useEffect, useRef } from "react";

interface Exp {
  id: number; jenis: string; content: string; tahun: string;
}

const colorMap: Record<string, string> = {
  html: "text-orange-400", css: "text-blue-400", javascript: "text-yellow-400",
  js: "text-yellow-400", react: "text-cyan-400", next: "text-cyan-400",
  tailwind: "text-teal-400", node: "text-green-400", prisma: "text-purple-400",
  postgresql: "text-indigo-400", typescript: "text-blue-400", git: "text-orange-400",
};

function getTechColor(jenis: string): string {
  const key = Object.keys(colorMap).find((k) =>
    jenis.toLowerCase().includes(k)
  );
  return key ? colorMap[key] : "text-amber-400";
}

export default function ExperienceSlider({ experiences }: { experiences: Exp[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const pos = useRef(0);
  const animRef = useRef<number | null>(null);
  const paused = useRef(false);

  const cardWidth = 288;
  const gap = 24;
  const step = cardWidth + gap;
  const totalWidth = experiences.length * step;

  function tick() {
    if (!paused.current) {
      pos.current -= 0.5;
      if (Math.abs(pos.current) >= totalWidth) {
        pos.current += totalWidth;
      }
    }
    if (trackRef.current) {
      const offset = isDown.current ? dragOffset.current : 0;
      trackRef.current.style.transform = `translateX(${pos.current + offset}px)`;
    }
    animRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [experiences.length]);

  function onMouseDown(e: React.MouseEvent) {
    isDown.current = true;
    paused.current = true;
    startX.current = e.pageX;
    dragOffset.current = 0;
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDown.current) return;
    dragOffset.current = e.pageX - startX.current;
  }

  function onMouseUp() {
    if (!isDown.current) return;
    pos.current += dragOffset.current;
    dragOffset.current = 0;
    isDown.current = false;
    paused.current = false;
  }

  if (experiences.length === 0) return <p className="text-center text-zinc-600 py-12">No experience added yet.</p>;

  return (
    <div className="mt-8 overflow-hidden">
      <div className="relative" style={{ maskImage: "linear-gradient(to right, transparent 2%, black 8%, black 92%, transparent 98%)" }}>
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="flex gap-6 select-none"
          style={{ cursor: "grab", width: "max-content" }}
        >
          {[...experiences, ...experiences].map((exp, i) => (
            <div
              key={`${exp.id}-${i}`}
              className="shrink-0 w-72 rounded-2xl bg-zinc-900/70 border border-zinc-800 p-5 flex flex-col transition-colors duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <span className="text-xs font-mono text-zinc-500 tracking-wide">
                {exp.tahun}
              </span>
              <hr className="my-2.5 border-zinc-800" />
              <h3 className={`font-bold text-lg ${getTechColor(exp.jenis)}`}>
                {exp.jenis}
              </h3>
              <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed line-clamp-4">
                {exp.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
