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
    summary: "This is the work chapter: a home for my professional background and projects.",
    githubUrl: "https://github.com/Bunter",
    linkedinUrl: "https://www.linkedin.com/in/lucasbunt/",
  },
  workExperiences: [], education: [], skills: [],
  projects: [{ name: "This little corner of the internet", description: "A personal home that brings work, writing, recipes, and travel together.", url: "https://github.com/Bunter/lucas-bunt-site" }],
};

export async function getCvData(): Promise<CvData> {
  if (process.env.SITES_STATIC_PREVIEW === "1" || !process.env.DATABASE_URL) {
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
