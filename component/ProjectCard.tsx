import Image from "next/image";

interface Project {
  id: number; title: string; images: string | null; desc: string | null; tech: string[]; posisi: string;
}

const gradients = [
  "from-blue-600 to-cyan-500",
  "from-purple-600 to-pink-500",
  "from-emerald-600 to-teal-500",
  "from-orange-600 to-rose-500",
  "from-indigo-600 to-violet-500",
];

export default function ProjectCard({ project, gradientIndex = 0 }: { project: Project; gradientIndex?: number }) {
  return (
    <article className="group h-full flex flex-col rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1">
      <div className={`h-2 w-full bg-gradient-to-r ${gradients[gradientIndex % gradients.length]}`} />

      {project.images && (
        <div className="relative h-44 bg-zinc-800 overflow-hidden">
          <Image
            src={project.images}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
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
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
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

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
          View Details
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </article>
  );
}
