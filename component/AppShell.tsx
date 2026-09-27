"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/component/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/project")) {
    return <div className="text-zinc-300">{children}</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="lg:ml-72 ml-0 text-zinc-300">{children}</div>
    </>
  );
}
