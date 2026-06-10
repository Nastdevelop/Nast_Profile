import prisma from "@/lib/prisma";
import ExperienceSlider from "./ExperienceSlider";

export default async function Experience() {
  const experiences = await prisma.experience.findMany({ orderBy: { id: "asc" } });
  return <ExperienceSlider experiences={experiences} />;
}
