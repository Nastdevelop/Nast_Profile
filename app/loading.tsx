import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
        <p className="text-sm text-zinc-500">Loading…</p>
      </div>
    </div>
  );
}