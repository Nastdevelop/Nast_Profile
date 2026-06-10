import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/component/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jagat Nasutio | Full Stack Web Developer",
  description:
    "Portfolio of Jagat Nasutio — an aspiring Full-Stack Web Developer passionate about building seamless user experiences and robust backend systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-dvh bg-zinc-950 flex flex-col">
        <Sidebar />
        <div className="lg:ml-72 ml-0 text-zinc-300">
          {children}
        </div>
      </body>
    </html>
  );
}
