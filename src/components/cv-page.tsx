import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { CvData, formatDateRange } from "@/lib/cv-data";

export function CvPage({ data }: { data: CvData }) {
  const skillsByCategory = data.skills.reduce<Record<string, string[]>>((acc, skill) => {
    acc[skill.category] = [...(acc[skill.category] ?? []), skill.name];
    return acc;
  }, {});

  return (
    <main className="bg-stone-50">
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[220px_1fr] md:py-20">
          <div className="relative h-52 w-52 overflow-hidden rounded-sm bg-stone-200">
            {data.profile.photoUrl ? (
              <Image
                src={data.profile.photoUrl}
                alt={data.profile.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl font-semibold text-stone-500">
                LB
              </div>
            )}
          </div>

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">CV</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-normal text-stone-950 md:text-6xl">
              {data.profile.name}
            </h1>
            <p className="mt-4 text-xl leading-8 text-stone-700">{data.profile.headline}</p>
            <p className="mt-6 text-base leading-8 text-stone-600">{data.profile.summary}</p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-stone-600">
              {data.profile.location ? (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {data.profile.location}
                </span>
              ) : null}
              {data.profile.email ? (
                <a className="inline-flex items-center gap-2 hover:text-stone-950" href={`mailto:${data.profile.email}`}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              ) : null}
              {data.profile.githubUrl ? (
                <Link className="inline-flex items-center gap-2 hover:text-stone-950" href={data.profile.githubUrl}>
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </Link>
              ) : null}
              {data.profile.linkedinUrl ? (
                <Link className="inline-flex items-center gap-2 hover:text-stone-950" href={data.profile.linkedinUrl}>
                  <ExternalLink className="h-4 w-4" />
                  LinkedIn
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1fr_320px]">
        <section className="space-y-10">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-8">
            {data.workExperiences.map((job) => (
              <article key={`${job.company}-${job.role}`} className="border-l-2 border-stone-300 pl-6">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <h2 className="text-xl font-semibold text-stone-950">{job.role}</h2>
                    <p className="text-base text-stone-700">{job.company}</p>
                  </div>
                  <p className="text-sm font-medium text-stone-500">
                    {formatDateRange(job.startDate, job.endDate, job.isCurrent)}
                  </p>
                </div>
                {job.summary ? <p className="mt-4 leading-7 text-stone-600">{job.summary}</p> : null}
                <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-700">
                  {job.highlights.map((highlight) => (
                    <li key={highlight.body} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                      <span>{highlight.body}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <SectionTitle>Projects</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.projects.map((project) => (
              <article key={project.name} className="rounded-sm border border-stone-200 bg-white p-5">
                <h3 className="font-semibold text-stone-950">{project.name}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-10">
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-5 space-y-5">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-stone-950">{category}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-sm bg-white px-3 py-1.5 text-sm text-stone-700 ring-1 ring-stone-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="mt-5 space-y-5">
              {data.education.map((item) => (
                <article key={item.institution}>
                  <h3 className="font-semibold text-stone-950">{item.institution}</h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {[item.degree, item.field].filter(Boolean).join(", ")}
                  </p>
                  {item.summary ? <p className="mt-2 text-sm leading-6 text-stone-600">{item.summary}</p> : null}
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{children}</h2>;
}
