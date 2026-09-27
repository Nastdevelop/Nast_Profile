import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import ProjectCard from "@/component/ProjectCard";

export const dynamic = "force-dynamic";

function safeParseJson(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { id: "asc" } });

  return (
    <div className="min-h-dvh">
      <section className="w-full py-12 md:py-16 px-6 max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="text-center mb-4">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
            Portfolio
          </span>
        </div>
        <h1 className="text-center font-bold text-3xl md:text-4xl text-zinc-100">
          All Projects
        </h1>
        <p className="text-center text-zinc-500 mt-3 max-w-lg mx-auto">
          Every project I have built so far. Click one to see the full story.
        </p>

        {projects.length === 0 ? (
          <p className="text-center text-zinc-600 py-20">No projects added yet.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {projects.map((project, i) => {
              const p = { ...project, tech: safeParseJson(project.tech) };
              return (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="block h-full"
                >
                  <ProjectCard project={p} gradientIndex={i} />
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
