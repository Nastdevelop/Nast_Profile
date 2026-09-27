"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/component/ProjectCard";

interface Project {
  id: number; title: string; images: string | null; desc: string | null; tech: string[]; posisi: string;
}

export default function ProjectSlider({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const lastDrag = useRef(0);
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

  function endDrag() {
    if (!isDown.current) return;
    pos.current += dragOffset.current;
    lastDrag.current = dragOffset.current;
    dragOffset.current = 0;
    isDown.current = false;
    paused.current = false;
  }

  function onTouchStart(e: React.TouchEvent) {
    isDown.current = true;
    paused.current = true;
    startX.current = e.touches[0].pageX;
    dragOffset.current = 0;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!isDown.current) return;
    dragOffset.current = e.touches[0].pageX - startX.current;
  }

  function onTouchEnd() {
    endDrag();
  }

  if (projects.length === 0) return <p className="text-center text-zinc-600 py-12">No projects added yet.</p>;

  function handleCardClick(id: number) {
    if (Math.abs(lastDrag.current) > 5) return;
    router.push(`/project/${id}`);
  }

  return (
    <div className="mt-8">
      <div className="overflow-hidden">
        <div className="relative" style={{ maskImage: "linear-gradient(to right, transparent 2%, black 8%, black 92%, transparent 98%)" }}>
          <div
            ref={trackRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="flex gap-6 select-none"
            style={{ cursor: "grab", width: "max-content" }}
          >
            {[...projects, ...projects].map((project, i) => (
              <div
                key={`${project.id}-${i}`}
                onClick={() => handleCardClick(project.id)}
                className={`shrink-0 w-80 ${isDown.current ? "" : "cursor-pointer"}`}
              >
                <ProjectCard project={project} gradientIndex={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 border border-zinc-700 hover:border-blue-500/50 text-zinc-300 hover:text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:bg-blue-500/10"
        >
          All Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
