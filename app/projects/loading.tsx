import { SkeletonBar, SkeletonCard } from "@/component/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-dvh">
      <section className="w-full py-12 md:py-16 px-6 max-w-6xl mx-auto">
        <SkeletonBar className="h-4 w-28 mb-8" />

        <div className="text-center mb-4">
          <SkeletonBar className="h-6 w-24 rounded-full mx-auto" />
        </div>
        <SkeletonBar className="h-9 w-64 mx-auto" />
        <SkeletonBar className="h-3 w-80 max-w-full mx-auto mt-4" />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}