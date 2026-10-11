"use client";

import LinkSpinner from "@/component/LinkSpinner";
import ProjectCard from "@/component/ProjectCard";

interface Project {
  id: number;
  title: string;
  images: string | null;
  desc: string | null;
  tech: string[];
  posisi: string;
}

/**
 * Client wrapper so <LinkSpinner> (which uses useLinkStatus) sits inside the
 * parent <Link>. Must be rendered as a descendant of a <Link>.
 */
export default function PendingProjectCard({
  project,
  gradientIndex,
}: {
  project: Project;
  gradientIndex: number;
}) {
  return (
    <ProjectCard
      project={project}
      gradientIndex={gradientIndex}
      footerSuffix={<LinkSpinner />}
    />
  );
}