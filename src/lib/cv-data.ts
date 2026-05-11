import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

export type CvData = {
  profile: {
    name: string;
    headline: string;
    summary: string;
    location?: string | null;
    email?: string | null;
    photoUrl?: string | null;
    githubUrl?: string | null;
    linkedinUrl?: string | null;
    resumeUrl?: string | null;
  };
  workExperiences: {
    company: string;
    role: string;
    location?: string | null;
    startDate: Date;
    endDate?: Date | null;
    isCurrent: boolean;
    summary?: string | null;
    highlights: { body: string }[];
  }[];
  education: {
    institution: string;
    degree?: string | null;
    field?: string | null;
    location?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    summary?: string | null;
  }[];
  skills: { name: string; category: string }[];
  projects: { name: string; description: string; url?: string | null }[];
};

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getPrisma() {
  if (!globalForPrisma.prisma) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  return globalForPrisma.prisma;
}

export const starterCvData: CvData = {
  profile: {
    name: "Lucas Bunt",
    headline: "Technology leader, builder, and systems thinker",
    summary:
      "A practical, polished CV will live here first. The public page is wired for database-backed content, and the admin workflow will make this editable once auth and Postgres are configured.",
    location: "United States",
    photoUrl: null,
    githubUrl: "https://github.com/Bunter",
    linkedinUrl: "https://www.linkedin.com/in/lucasbunt/",
  },
  workExperiences: [
    {
      company: "Current / recent role",
      role: "Role title",
      location: null,
      startDate: new Date("2024-01-01"),
      endDate: null,
      isCurrent: true,
      summary: "Replace this with the strongest version of the story from your resume or LinkedIn.",
      highlights: [
        { body: "Led high-impact work across product, engineering, operations, or strategy." },
        { body: "Built durable systems and processes that made teams faster and clearer." },
      ],
    },
  ],
  education: [
    {
      institution: "Education",
      degree: "Degree or credential",
      field: null,
      location: null,
      startDate: null,
      endDate: null,
      summary: "Academic background, certifications, or continuing education can go here.",
    },
  ],
  skills: [
    { name: "Postgres", category: "Data" },
    { name: "Product strategy", category: "Leadership" },
    { name: "Systems design", category: "Technology" },
  ],
  projects: [
    {
      name: "Personal website platform",
      description:
        "A public portfolio and private admin home base for CV, recipes, travel, and writing.",
      url: null,
    },
  ],
};

export async function getCvData(): Promise<CvData> {
  if (!process.env.DATABASE_URL) {
    return starterCvData;
  }

  try {
    const prisma = getPrisma();
    const profile = await prisma.profile.findFirst({
      include: {
        workExperiences: {
          include: { highlights: { orderBy: { sortOrder: "asc" } } },
          orderBy: { sortOrder: "asc" },
        },
        education: { orderBy: { sortOrder: "asc" } },
        skills: { orderBy: [{ category: "asc" }, { sortOrder: "asc" }] },
        projects: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!profile) {
      return starterCvData;
    }

    return {
      profile,
      workExperiences: profile.workExperiences,
      education: profile.education,
      skills: profile.skills,
      projects: profile.projects,
    };
  } catch {
    return starterCvData;
  }
}

export function formatDateRange(startDate?: Date | null, endDate?: Date | null, isCurrent = false) {
  const fmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });
  const start = startDate ? fmt.format(startDate) : "Present";
  const end = isCurrent || !endDate ? "Present" : fmt.format(endDate);

  return `${start} - ${end}`;
}
