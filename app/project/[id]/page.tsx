import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  if (!Number.isInteger(projectId)) notFound();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!project) notFound();

  let tech: string[] = [];
  try {
    tech = project.tech ? JSON.parse(project.tech) : [];
  } catch {
    tech = [];
  }

  return (
    <div className="min-h-dvh">
      <section className="w-full py-12 md:py-16 px-6 max-w-5xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          {project.posisi && (
            <span className={`self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
              project.posisi === "frontend"
                ? "bg-cyan-500/20 text-cyan-300"
                : project.posisi === "backend"
                ? "bg-green-500/20 text-green-300"
                : "bg-purple-500/20 text-purple-300"
            }`}>
              {project.posisi}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 leading-tight">
            {project.title}
          </h1>
          {project.desc && (
            <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
              {project.desc}
            </p>
          )}

          {tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/50 px-3 py-1 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cover image */}
        {project.images && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 mt-8">
            <Image
              src={project.images}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="mt-10 max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-6">
            About This Project
          </h2>
          {project.content ? (
            <div className="space-y-5">
              {project.content.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="text-base md:text-lg text-zinc-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-base text-zinc-500 italic">
              No detailed description available for this project yet.
            </p>
          )}
        </div>

        {/* Visit link */}
        {project.url && (
          <div className="mt-10">
            <a
              href={
                project.url.startsWith("http://") || project.url.startsWith("https://")
                  ? project.url
                  : `https://${project.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
            >
              Visit Live Project
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
