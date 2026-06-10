"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface Project {
  id: number; title: string; images: string | null; desc: string | null; tech: string[]; posisi: string; url: string | null;
}

const gradients = [
  "from-blue-600 to-cyan-500",
  "from-purple-600 to-pink-500",
  "from-emerald-600 to-teal-500",
  "from-orange-600 to-rose-500",
  "from-indigo-600 to-violet-500",
];

export default function ProjectSlider({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const pos = useRef(0);
  const animRef = useRef<number | null>(null);
  const paused = useRef(false);

  const cardWidth = 320;
  const gap = 24;
  const step = cardWidth + gap;
  const totalWidth = projects.length * step;

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
  }, [projects.length]);

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

  if (projects.length === 0) return <p className="text-center text-zinc-600 py-12">No projects added yet.</p>;

  function handleClick(url: string | null) {
    if (!url) return;
    const href = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    window.open(href, "_blank");
  }

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
          {[...projects, ...projects].map((project, i) => (
            <div
              key={`${project.id}-${i}`}
              onClick={() => handleClick(project.url)}
              className={`shrink-0 w-80 rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/5 ${project.url ? "cursor-pointer" : ""}`}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${gradients[i % gradients.length]}`} />

              {project.images && (
                <div className="relative h-44 bg-zinc-800 overflow-hidden">
                  <Image
                    src={project.images}
                    alt={project.title}
                    fill
                    className="object-cover pointer-events-none"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-zinc-100">{project.title}</h3>
                  {project.posisi && (
                    <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      project.posisi === "frontend"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : project.posisi === "backend"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-purple-500/20 text-purple-300"
                    }`}>
                      {project.posisi}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {project.desc}
                </p>

                {project.tech.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
