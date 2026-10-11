import { SkeletonDetail } from "@/component/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-dvh">
      <section className="w-full py-12 md:py-16 px-6">
        <SkeletonDetail />
      </section>
    </div>
  );
}