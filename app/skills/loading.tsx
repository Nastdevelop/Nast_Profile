import { SkeletonBar, SkeletonTable } from "@/component/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-dvh flex flex-col">
      <div className="flex-1 py-12 md:py-16 px-6 max-w-4xl mx-auto w-full">
        <SkeletonBar className="h-4 w-24 mb-6" />

        <div className="text-center mb-4">
          <SkeletonBar className="h-6 w-24 rounded-full mx-auto" />
        </div>
        <SkeletonBar className="h-9 w-56 mx-auto" />
        <SkeletonBar className="h-3 w-96 max-w-full mx-auto mt-4" />

        <div className="mt-8">
          <SkeletonTable rows={8} />
        </div>
      </div>
    </div>
  );
}