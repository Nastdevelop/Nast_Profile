import Image from "next/image";
import { ArrowDown, ExternalLink } from "lucide-react";
import ProjectSlider from "@/component/ProjectSlider";
import ContactForm from "@/component/ContactForm";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getProjects() {
  const projects = await prisma.project.findMany({ orderBy: { id: "asc" } });
  return projects.map((p) => ({ ...p, tech: safeParseJson(p.tech) }));
}

function safeParseJson(val: string | null): string[] {
  if (!val) return [];
  try { return JSON.parse(val); } catch { return []; }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col flex-1 font-sans">

      {/* ============ HERO ============ */}
      <section
        id="hero"
        className="relative min-h-dvh flex items-center justify-center px-6 py-12 md:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-zinc-950 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full max-w-5xl lg:ml-16">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 p-1 shadow-xl shadow-blue-500/20">
                <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden">
                  <Image
                    src="/images/577ed941-39b9-4c80-83d0-cb3579c999a6.jpg"
                    alt="Jagat Nasution"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 w-full min-w-0 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-100 leading-tight break-words">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-glow">
Jagat Nasutio
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-400">
              Full Stack Web Developer
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              An aspiring Full-Stack Web Developer with a strong vision to master
              the entire web development lifecycle. I combine a passion for
              creating seamless user experiences with a drive to build robust
              backend systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 justify-center lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm sm:text-base font-medium px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40"
              >
                View CV
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 text-sm sm:text-base font-medium px-5 sm:px-6 py-2.5 rounded-xl transition-all duration-300"
              >
                My Projects
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Tech Slider */}
            <div className="mt-6 w-full max-w-xl overflow-hidden">
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee gap-8 w-max">
                  {[ 
                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Vue.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
                    { name: "NestJS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
                    { name: "Express", src: "https://cdn.simpleicons.org/express/ffffff" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
                    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                    { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                    { name: "PHP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
                    { name: "Prisma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
                    { name: "TypeORM", src: "https://cdn.simpleicons.org/typeorm/FE0803" },
                    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                    { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
                    { name: "shadcn/ui", src: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
                    { name: "GitHub", src: "https://cdn.simpleicons.org/github/ffffff" },
                    { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/ffffff" },
                  ].concat([
                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Vue.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
                    { name: "NestJS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
                    { name: "Express", src: "https://cdn.simpleicons.org/express/ffffff" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
                    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                    { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                    { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                    { name: "PHP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
                    { name: "Prisma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
                    { name: "TypeORM", src: "https://cdn.simpleicons.org/typeorm/FE0803" },
                    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                    { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
                    { name: "shadcn/ui", src: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
                    { name: "GitHub", src: "https://cdn.simpleicons.org/github/ffffff" },
                    { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/ffffff" },
                  ]).map((tech, i) => (
                    <div key={i} className="flex items-center justify-center h-10 w-10 opacity-70 hover:opacity-100 transition-opacity">
                      <Image src={tech.src} alt={tech.name} width={40} height={40} className="w-8 h-8" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-1 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 animate-bounce">
          <span className="text-xs">Scroll down</span>
          <ArrowDown className="w-4 h-4" />
        </div>
      </section>



        {/* ============ EXPERIENCE ============ */}
        <section
          id="experience"
          className="w-full scroll-mt-24 py-8 md:py-10 px-6 max-w-5xl mx-auto"
        >
          <div className="text-center mb-6">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
              Experience
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-zinc-100">
              Experience
            </h2>
          </div>
          <div className="border border-zinc-800 bg-gradient-to-br from-zinc-900/70 to-zinc-950/60 rounded-2xl px-6 md:px-12 py-8 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
              <div className="flex items-center justify-center gap-8 md:gap-10">
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none">10+</span>
                  <span className="text-xs md:text-sm text-zinc-400 mt-2 uppercase tracking-wide">Projects</span>
                </div>
                <div className="h-12 md:h-16 w-px bg-zinc-800" />
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-none">2+</span>
                  <span className="text-xs md:text-sm text-zinc-400 mt-2 uppercase tracking-wide">Years</span>
                </div>
              </div>
              <p className="text-center md:text-left text-zinc-300 leading-relaxed">
                I&apos;ve built several production-ready projects, ranging from landing pages to full web applications. From simple marketing sites to complex systems, I focus on clean code, reliable functionality, and seamless user experiences.
              </p>
            </div>
          </div>
        </section>

        {/* ============ PROJECTS ============ */}
        <section
          id="projects"
          className="w-full scroll-mt-20 py-12 md:py-16 px-6 max-w-5xl mx-auto"
        >
          <div className="text-center mb-4">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              Portfolio
            </span>
          </div>
          <h2 className="text-center font-bold text-2xl md:text-3xl text-zinc-100">
            My Projects
          </h2>
          <p className="text-center text-zinc-500 mt-2 max-w-lg mx-auto">
            A selection of projects I have built to sharpen my skills.
          </p>

          <ProjectSlider projects={projects} />
        </section>

        {/* ============ CONTACT ============ */}
        <section
          id="contact"
          className="w-full scroll-mt-20 py-12 md:py-16 px-6 max-w-5xl mx-auto"
        >
          <div className="text-center mb-4">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
              Contact
            </span>
          </div>
          <h2 className="text-center font-bold text-2xl md:text-3xl text-zinc-100">
            Get In Touch
          </h2>
          <p className="text-center text-zinc-500 mt-2 max-w-lg mx-auto">
            Kirim pesan langsung ke email. Bisa juga hubungi lewat channel di samping.
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <ContactForm />

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/083173066902"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 rounded-xl px-4 py-3 text-zinc-300 hover:text-zinc-100 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-green-400"
                >
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 .5 11.5 11.5 0 0 0 .5 12c0 2.03.53 4.01 1.54 5.76L.5 23.5l5.86-1.53A11.49 11.49 0 0 0 12 23.5 11.5 11.5 0 0 0 23.5 12c0-3.07-1.2-5.96-3.48-8.02Zm-8.52 18c-1.85 0-3.67-.5-5.25-1.44l-.38-.23-3.48.91.93-3.39-.25-.39A9.5 9.5 0 0 1 2.5 12 9.5 9.5 0 0 1 12 2.5 9.44 9.44 0 0 1 18.71 5.29 9.44 9.44 0 0 1 21.5 12a9.5 9.5 0 0 1-9.5 9.48Zm5.2-7.12c-.28-.14-1.65-.81-1.9-.9-.26-.09-.45-.14-.64.14-.19.28-.73.9-.9 1.08-.17.19-.33.21-.61.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.01 3.07 4.87 4.3.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33Z" />
                </svg>
                <span className="font-medium">WhatsApp</span>
                <span className="ml-auto text-sm text-zinc-500">+62 831-7306-6902 / 085143279638</span>
              </a>
              <a
                href="https://www.linkedin.com/in/nasutio-developer-928777414/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 rounded-xl px-4 py-3 text-zinc-300 hover:text-zinc-100 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-blue-400"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                </svg>
                <span className="font-medium">LinkedIn</span>
                <span className="ml-auto text-sm text-zinc-500">@nasutio developer</span>
              </a>
              <a
                href="mailto:nasutiodeveloper@gmail.com"
                className="flex items-center gap-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 rounded-xl px-4 py-3 text-zinc-300 hover:text-zinc-100 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-red-400"
                >
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                </svg>
                <span className="font-medium">Email</span>
                <span className="ml-auto text-sm text-zinc-500">nasutiodeveloper@gmail.com</span>
              </a>
              <a
                href="https://www.tiktok.com/@nastdevelop0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 rounded-xl px-4 py-3 text-zinc-300 hover:text-zinc-100 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
                </svg>
                <span className="font-medium">TikTok</span>
                <span className="ml-auto text-sm text-zinc-500">@Nast Develop</span>
              </a>
              <a
                href="https://www.instagram.com/nastdevelop/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 rounded-xl px-4 py-3 text-zinc-300 hover:text-zinc-100 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-pink-400"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7m11 1a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-5 2a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z" />
                </svg>
                <span className="font-medium">Instagram</span>
                <span className="ml-auto text-sm text-zinc-500">@nastdevelop</span>
              </a>
            </div>
          </div>
        </section>
        
        <footer className="w-full py-6 border-t border-zinc-800">
          <p className="text-center text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Jagat Nasutio
          </p>
        </footer>
      </div>
    );
  }
