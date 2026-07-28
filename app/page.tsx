import Image from "next/image";
import { ArrowDown, ExternalLink } from "lucide-react";
import Experience from "@/component/Experience"
import Skills from "@/component/skills"
import ProjectSlider from "@/component/ProjectSlider"
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getProjects() {
  const projects = await prisma.project.findMany({ orderBy: { id: "asc" } });
  return projects.map((p) => ({ ...p, tech: safeParseJson(p.tech) }));
}

function safeParseJson(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col flex-1 font-sans">

      {/* ============ HERO ============ */}
      <section
        id="hero"
        className="relative min-h-dvh flex items-center justify-center px-6 py-12 md:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-zinc-950 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full max-w-5xl lg:ml-16">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 p-1 shadow-xl shadow-blue-500/20">
                <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden">
                  <Image
                    src="/images/577ed941-39b9-4c80-83d0-cb3579c999a6.jpg"
                    alt="Jagat Nasution"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-100 leading-tight">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-glow">
Jagat Nasutio
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-400">
              Full Stack Web Developer
            </h2>
            <p className="text-base text-zinc-500 max-w-lg leading-relaxed">
              An aspiring Full-Stack Web Developer with a strong vision to master
              the entire web development lifecycle. I combine a passion for
              creating seamless user experiences with a drive to build robust
              backend systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
              >
                View CV
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 font-medium px-6 py-2.5 rounded-xl transition-all duration-300"
              >
                My Projects
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-1 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 animate-bounce">
          <span className="text-xs">Scroll down</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section
        id="experience"
        className="w-full py-16 md:py-24 px-6 max-w-5xl mx-auto"
      >
        <div className="text-center mb-4">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
            Journey
          </span>
        </div>
        <h2 className="text-center font-bold text-2xl md:text-3xl text-zinc-100">
          My Progress
        </h2>
        <p className="text-center text-zinc-500 mt-2 max-w-lg mx-auto">
          Every line of code is a step forward. Here is my learning journey so far.
        </p>
        <Experience />
      </section>

      {/* ============ SKILLS ============ */}
      <section
        id="skills"
        className="w-full py-16 md:py-24 px-6 max-w-5xl mx-auto"
      >
        <div className="text-center mb-4">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
            Toolbox
          </span>
        </div>
        <h2 className="text-center font-bold text-2xl md:text-3xl text-zinc-100">
          My Skills
        </h2>
        <p className="text-center text-zinc-500 mt-2 max-w-lg mx-auto">
          I may not learn the fastest, but I never stop growing. Here is the
          evidence of my continuous progress.
        </p>
        <Skills limit={5} />
      </section>

      {/* ============ PROJECTS ============ */}
      <section
        id="projects"
        className="w-full py-16 md:py-24 px-6 max-w-5xl mx-auto"
      >
        <div className="text-center mb-4">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            Portfolio
          </span>
        </div>
        <h2 className="text-center font-bold text-2xl md:text-3xl text-zinc-100">
          My Projects
        </h2>
        <p className="text-center text-zinc-500 mt-2 max-w-lg mx-auto">
          A selection of projects I have built to sharpen my skills.
        </p>

        <ProjectSlider projects={projects} />
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="w-full py-8 border-t border-zinc-800">
        <p className="text-center text-sm text-zinc-600">
          &copy; {new Date().getFullYear()} Jagat Nasutio
        </p>
      </footer>
    </div>
  );
}
