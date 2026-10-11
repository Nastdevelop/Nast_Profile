import { SkeletonBar } from "@/component/Skeleton";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 flex overflow-hidden">
      <aside className="fixed left-0 top-0 w-64 h-dvh bg-zinc-900/80 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <SkeletonBar className="h-5 w-32" />
          <SkeletonBar className="h-3 w-28 mt-2" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBar key={i} className="h-10 w-full rounded-xl" />
          ))}
        </nav>
      </aside>

      <main className="ml-64 flex-1 p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-2">
            <SkeletonBar className="h-7 w-48" />
            <SkeletonBar className="h-3 w-20" />
          </div>
          <div className="flex gap-3">
            <SkeletonBar className="h-10 w-28 rounded-xl" />
            <SkeletonBar className="h-10 w-36 rounded-xl" />
          </div>
        </div>

        <SkeletonBar className="h-96 w-full rounded-xl" />
      </main>
    </div>
  );
}