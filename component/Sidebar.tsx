"use client";

import {
  UserRound, CodeXml, Kanban, Sparkles, ChevronRight, Menu, X, Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "#hero", label: "Profile", icon: UserRound },
  { href: "#experience", label: "Experience", icon: CodeXml },
  { href: "#skills", label: "Skills", icon: Kanban },
  { href: "#projects", label: "Projects", icon: Sparkles },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((res) => {
      if (res.ok) setIsAdmin(true);
    });
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const { href } of navItems) {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  function handleNav(href: string) {
    setOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-zinc-100 transition-all"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-dvh w-72 bg-zinc-900/95 backdrop-blur-xl
          border-r border-zinc-800 flex flex-col py-10
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:z-auto
        `}
      >
        {/* Close button — mobile only */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile */}
        <div className="px-8 flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 p-1">
              <div className="w-full h-full rounded-full bg-zinc-800 overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="Jagat Nasution"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold text-zinc-100">Nasutio Developer</h2>
            <p className="text-sm text-zinc-400">Full Stack Web Developer</p>
          </div>
        </div>

        <hr className="border-zinc-800 mx-6 my-6" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.href);
                }}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                <ChevronRight
                  className={`ml-auto w-3.5 h-3.5 transition-transform duration-300 ${
                    isActive ? "translate-x-0.5 opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="mt-auto px-8">
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2.5 mb-3 rounded-xl text-sm font-medium text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30 transition-all"
            >
              <Shield className="w-4 h-4" /> Admin Dashboard
            </Link>
          )}
          <div className="rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-zinc-800 p-4 text-center">
            <p className="text-xs text-zinc-500">Open to opportunities</p>
          </div>
        </div>
      </aside>
    </>
  );
}
