import prisma from "@/lib/prisma";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  frontend: "bg-blue-500/20 text-blue-300",
  language: "bg-yellow-500/20 text-yellow-300",
  framework: "bg-cyan-500/20 text-cyan-300",
  styling: "bg-teal-500/20 text-teal-300",
  backend: "bg-green-500/20 text-green-300",
  orm: "bg-purple-500/20 text-purple-300",
  database: "bg-indigo-500/20 text-indigo-300",
  tools: "bg-orange-500/20 text-orange-300",
  auth: "bg-rose-500/20 text-rose-300",
};

function getCategoryColor(cate: string): string {
  const key = Object.keys(categoryColors).find((k) =>
    cate.toLowerCase().includes(k)
  );
  return key ? categoryColors[key] : "bg-zinc-500/20 text-zinc-300";
}

export default async function Skills({
  limit,
}: {
  limit?: number;
}) {
  const all = await prisma.skill.findMany({ orderBy: { id: "asc" } });
  const skills = limit ? all.slice(0, limit) : all;
  const hasMore = limit !== undefined && all.length > limit;

  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-800 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/50">
            <th className="px-6 py-4 max-sm:px-3 max-sm:py-3 text-left text-sm max-sm:text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Item
            </th>
            <th className="px-6 py-4 max-sm:px-3 max-sm:py-3 text-left text-sm max-sm:text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-4 max-sm:px-3 max-sm:py-3 text-left text-sm max-sm:text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Purpose
            </th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, i) => (
            <tr
              key={skill.id}
              className="border-b border-zinc-800/50 transition-all duration-200 hover:bg-zinc-800/40 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
            >
              <td className="px-6 py-4 max-sm:px-3 max-sm:py-3 text-sm max-sm:text-xs font-medium text-zinc-200">
                {skill.item}
              </td>
              <td className="px-6 py-4 max-sm:px-3 max-sm:py-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 max-sm:px-2 max-sm:py-0.5 text-xs max-sm:text-[10px] font-medium ${getCategoryColor(skill.cate)}`}
                >
                  {skill.cate}
                </span>
              </td>
              <td className="px-6 py-4 max-sm:px-3 max-sm:py-3 text-sm max-sm:text-xs text-zinc-400">
                {skill.purpose}
              </td>
            </tr>
          ))}
          {skills.length === 0 && (
            <tr>
              <td colSpan={3} className="px-6 py-12 max-sm:px-4 max-sm:py-8 text-center text-sm max-sm:text-xs text-zinc-600">
                No skills added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {hasMore && (
        <div className="flex justify-center py-6">
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
          >
            Show More ({all.length - limit} more)
          </Link>
        </div>
      )}
    </div>
  );
}
