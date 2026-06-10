import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Skills from "@/component/skills";

export const dynamic = "force-dynamic";

export default function SkillsPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="flex-1 py-24 px-6 max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="text-center mb-4">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
            Toolbox
          </span>
        </div>
        <h1 className="text-center font-bold text-3xl text-zinc-100">
          All Skills
        </h1>
        <p className="text-center text-zinc-500 mt-2 max-w-lg mx-auto">
          Every tool I have picked up along the way.
        </p>

        <Skills />
      </div>

      <footer className="w-full py-8 border-t border-zinc-800">
        <p className="text-center text-sm text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">
            &larr; Back to portfolio
          </Link>
        </p>
      </footer>
    </div>
  );
}
