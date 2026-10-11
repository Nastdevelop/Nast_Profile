export function SkeletonBar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-800/80 ${className}`}
    />
  );
}

export function SkeletonCard({ index = 0 }: { index?: number }) {
  const gradients = [
    "from-blue-600/40 to-cyan-500/40",
    "from-purple-600/40 to-pink-500/40",
    "from-emerald-600/40 to-teal-500/40",
    "from-orange-600/40 to-rose-500/40",
    "from-indigo-600/40 to-violet-500/40",
  ];

  return (
    <div className="flex flex-col rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden h-full">
      <div className={`h-2 w-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />

      <div className="h-44 bg-zinc-800/60 animate-pulse" />

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-2">
          <SkeletonBar className="h-5 w-2/3" />
          <SkeletonBar className="h-5 w-16 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <SkeletonBar className="h-3 w-full" />
          <SkeletonBar className="h-3 w-11/12" />
          <SkeletonBar className="h-3 w-8/12" />
        </div>
        <div className="flex gap-1.5">
          <SkeletonBar className="h-4 w-14 rounded-md" />
          <SkeletonBar className="h-4 w-16 rounded-md" />
          <SkeletonBar className="h-4 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-zinc-800 overflow-hidden">
      <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
        {["Item", "Category", "Purpose"].map((h) => (
          <SkeletonBar key={h} className="h-3 w-20" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-3 gap-4 px-4 py-3 border-b border-zinc-800/50 last:border-b-0"
        >
          <SkeletonBar className="h-3.5 w-28" />
          <SkeletonBar className="h-5 w-24 rounded-full" />
          <SkeletonBar className="h-3.5 w-full max-w-[220px]" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <SkeletonBar className="h-4 w-28 mb-8" />

      <div className="flex flex-col gap-4">
        <SkeletonBar className="h-5 w-24 rounded-full" />
        <SkeletonBar className="h-10 w-3/4 md:h-12" />
        <SkeletonBar className="h-4 w-full max-w-2xl" />
        <div className="flex gap-2 mt-2">
          <SkeletonBar className="h-6 w-20 rounded-lg" />
          <SkeletonBar className="h-6 w-24 rounded-lg" />
          <SkeletonBar className="h-6 w-16 rounded-lg" />
        </div>
      </div>

      <SkeletonBar className="w-full aspect-video rounded-2xl mt-8" />

      <div className="mt-10 max-w-3xl flex flex-col gap-5">
        <SkeletonBar className="h-3.5 w-40" />
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-10/12" />
      </div>
    </div>
  );
}