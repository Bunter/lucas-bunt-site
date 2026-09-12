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
    dateLabel?: string;
    degree?: string | null;
    field?: string | null;
    location?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    summary?: string | null;
  }[];
  skills: { name: string; category: string }[];
  certifications?: { name: string; issuer: string; issued: string; credentialId?: string }[];
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

// Adapted from Lucas’s LinkedIn profile, read September 10, 2026.
export const starterCvData: CvData = {
  "profile": {
    "name": "Lucas Bunt",
    "headline": "Engineering Manager at ACV Auctions",
    "summary": "I lead engineering teams at the intersection of people, process, and technology. My background spans engineering management, enterprise architecture, cloud-native transformation, and hands-on software development. I care about helping teams deliver high-quality software sustainably—and turning advances in AI, machine learning, and automation into practical improvements.",
    "location": "Buffalo, New York, United States",
    "githubUrl": "https://github.com/Bunter",
    "linkedinUrl": "https://www.linkedin.com/in/lucasbunt/"
  },
  "workExperiences": [
    {
      "company": "ACV Auctions",
      "role": "Engineering Manager",
      startDate: new Date("2024-11-01T12:00:00Z"),
      "endDate": null,
      "isCurrent": true,
      "location": "Buffalo, New York · Hybrid",
      "summary": "Leading multiple agile teams across domain engineering and enablement.",
      "highlights": [
        {
          "body": "Mentor engineers, remove delivery blockers, and build healthy, inclusive teams aligned with product and business goals."
        },
        {
          "body": "Support custom machine learning models, evolve products into platforms, and modernize legacy systems."
        },
        {
          "body": "Guide adoption of AI tools and engineering workflows, with internal tech talks that turn emerging technology into practical guidance."
        },
        {
          "body": "Use DORA metrics, AI adoption measures, code quality, delivery performance, and defect trends to improve delivery and reduce risk."
        }
      ]
    },
    {
      "company": "Independent Health",
      "role": "Enterprise Solutions Architect",
      startDate: new Date("2021-10-01T12:00:00Z"),
      endDate: new Date("2024-11-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo, New York · Remote",
      "summary": "Combined enterprise architecture, AI delivery, and agile transformation.",
      "highlights": [
        {
          "body": "Founded and led the AI Experts team, taking ideas through proofs of concept and into production when business ROI evaluations supported them, using Azure, Microsoft, and OpenAI technology."
        },
        {
          "body": "Helped implement SAFe across digital experience teams, establishing cross-functional teams, ceremonies, and delivery practices."
        },
        {
          "body": "Guided technology choices, reusable system designs, vendor integrations, technical documentation, capacity planning, and testing."
        }
      ]
    },
    {
      "company": "Stark & Wayne LLC",
      "role": "Director of Cloud Native Transformations / Principal Consultant",
      startDate: new Date("2018-09-01T12:00:00Z"),
      endDate: new Date("2021-10-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Led cloud-native organizational and application transformations for companies including Fortune Global 500 and Cloud 100 businesses.",
      "highlights": [
        {
          "body": "Helped modernize product delivery practices and refactor monolithic applications into containerized, scalable, resilient service-oriented architectures."
        },
        {
          "body": "Applied FinOps practices to improve cloud-cost visibility and balance delivery speed, cost, and quality."
        },
        {
          "body": "Provided hands-on consulting across software development, infrastructure, cloud migration, automated CI/CD pipelines, testing, and proofs of concept."
        }
      ]
    },
    {
      "company": "Liaison International",
      "role": "Engineering Manager",
      startDate: new Date("2015-07-01T12:00:00Z"),
      endDate: new Date("2018-08-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Managed agile delivery, technical standards, and the development of engineers.",
      "highlights": [
        {
          "body": "Oversaw delivery schedules and budgets while guiding teams toward successful project outcomes."
        },
        {
          "body": "Coached engineers on technical growth and career development, promoted software quality practices, and fostered a constructive team culture."
        }
      ]
    },
    {
      "company": "Liaison International",
      "role": "Principal Software Engineer / Team Lead",
      startDate: new Date("2013-07-01T12:00:00Z"),
      endDate: new Date("2015-07-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Led development of enterprise web applications in collaboration with product, architecture, QA, and operations.",
      "highlights": [
        {
          "body": "Guided user stories, estimates, design and code reviews, testing, and release deployment."
        },
        {
          "body": "Mentored teammates, migrated legacy applications, improved integrations, and resolved technical and application problems."
        }
      ]
    },
    {
      "company": "Liaison International",
      "role": "Software Engineer",
      startDate: new Date("2011-01-01T12:00:00Z"),
      endDate: new Date("2013-07-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Designed, developed, and tested enterprise web applications.",
      "highlights": [
        {
          "body": "Helped build a large-scale, high-volume, cross-platform ETL solution using RabbitMQ."
        },
        {
          "body": "Collaborated with engineers, business analysts, and project managers on user stories, estimates, work plans, and application support."
        }
      ]
    },
    {
      "company": "Division by Zero",
      "role": "Software Consultant",
      startDate: new Date("2007-01-01T12:00:00Z"),
      endDate: new Date("2013-01-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Delivered web applications, mobile development, and legacy software integrations while maintaining long-term client relationships.",
      "highlights": []
    },
    {
      "company": "WCTS",
      "role": "Network Consultant",
      startDate: new Date("2004-08-01T12:00:00Z"),
      endDate: new Date("2007-08-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Provided managed services and network administration for small and medium-sized businesses and nonprofit organizations, alongside software development, IT consulting, training, business analysis, and workflow optimization.",
      "highlights": []
    },
    {
      "company": "OfficeMax",
      "role": "Manager",
      startDate: new Date("2000-01-01T12:00:00Z"),
      endDate: new Date("2004-07-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo, Brooklyn, and Elmont, New York",
      "summary": "Progressed from electronics department supervisor in Buffalo to operations manager in Brooklyn and sales manager in Elmont.",
      "highlights": []
    },
    {
      "company": "CompUSA",
      "role": "Computer Hardware Technician",
      startDate: new Date("1998-01-01T12:00:00Z"),
      endDate: new Date("2000-01-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Worked as an A+ certified computer repair technician, providing on-site computer and network installation and training.",
      "highlights": []
    },
    {
      "company": "ClientLogic",
      "role": "Technical Support Specialist",
      startDate: new Date("1996-08-01T12:00:00Z"),
      endDate: new Date("1998-01-01T12:00:00Z"),
      "isCurrent": false,
      "location": "Buffalo–Niagara Falls Area",
      "summary": "Provided Level I and Level II telephone technical support for Microsoft Office, Microsoft Back Office, and Corel Office Suite.",
      "highlights": []
    }
  ],
  "education": [
    {
      "institution": "Buffalo State University",
      "degree": "Bachelor of Science (BS)",
      "field": "Applied Mathematics",
      "dateLabel": "2006–2010",
      "summary": "Undergraduate research through the URGE to COMPUTE program used parallel computation to model fiber-optic communication and signal degradation. Worked on a four-student team studying outage prediction and fault tolerance, using the University at Buffalo’s Center for Computational Research to accelerate the modeling. Findings were presented at Penn State and JMM 2010 in San Francisco. Physics Club president, Math League participant, and recipient of an NSA research grant/fellowship."
    },
    {
      "institution": "University at Buffalo",
      "field": "Applied Mathematics",
      "dateLabel": "1996–2010"
    },
    {
      "institution": "Erie Community College",
      "degree": "Associate of Science (AS)",
      "field": "Mathematics and Computer Science",
      "dateLabel": "2004–2006",
      "summary": "Paid mathematics tutor in the City Campus Math Room."
    },
    {
      "institution": "City Honors School",
      "dateLabel": "Sep 1993–Jun 1996"
    },
    {
      "institution": "Hutchinson Central Technical High School",
      "dateLabel": "Sep 1992–Jun 1993"
    }
  ],
  "skills": [
    {
      "category": "Leadership",
      "name": "People Management"
    },
    {
      "category": "Leadership",
      "name": "Engineering Leadership"
    },
    {
      "category": "Engineering",
      "name": "Software Engineering"
    },
    {
      "category": "Engineering",
      "name": "Project Architecture"
    },
    {
      "category": "Engineering",
      "name": "Software Development Life Cycle (SDLC)"
    },
    {
      "category": "AI & cloud",
      "name": "Artificial Intelligence (AI)"
    }
  ],
  "certifications": [
    {
      "name": "SAFe Agilist Certification",
      "issuer": "SAFe by Scaled Agile, Inc.",
      "issued": "Oct 2022", "credentialId": "44023686-9799"
    },
    {
      "name": "FinOps Certified Practitioner",
      "issuer": "The Linux Foundation",
      "issued": "Sep 2020", "credentialId": "LF-g5c1u5ma04"
    },
    {
      "name": "Certified Scrum Master",
      "issuer": "Scrum Alliance",
      "issued": "Mar 2012"
    },
    {
      "name": "A+",
      "issuer": "CompTIA",
      "issued": "Jul 1997"
    }
  ],
  "projects": [
    {
      "name": "This little corner of the internet",
      "description": "A personal home that brings work, writing, recipes, and travel together.",
      "url": "https://github.com/Bunter/lucas-bunt-site"
    }
  ]
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
  const fmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
  const start = startDate ? fmt.format(startDate) : "Present";
  const end = isCurrent || !endDate ? "Present" : fmt.format(endDate);

  return `${start} - ${end}`;
}
