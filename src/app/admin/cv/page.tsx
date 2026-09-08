import { AdminUnavailable } from "@/components/admin-unavailable";
import { getCvData } from "@/lib/cv-data";

export default async function AdminCvPage() {
  if (process.env.SITES_STATIC_PREVIEW === "1" || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) return <AdminUnavailable />;
  const data = await getCvData();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-stone-950">CV editor</h1>
        <p className="mt-4 max-w-2xl leading-7 text-stone-600">
          First pass editor shell. Next step is wiring these forms to Prisma mutations once the
          hosted Postgres database is available.
        </p>
      </div>

      <form className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <Panel title="Profile">
            <Field label="Name" value={data.profile.name} />
            <Field label="Headline" value={data.profile.headline} />
            <Field label="Summary" value={data.profile.summary} multiline />
            <Field label="Photo URL" value={data.profile.photoUrl ?? ""} />
            <Field label="LinkedIn" value={data.profile.linkedinUrl ?? ""} />
            <Field label="GitHub" value={data.profile.githubUrl ?? ""} />
          </Panel>

          <Panel title="Experience">
            {data.workExperiences.map((job) => (
              <div key={`${job.company}-${job.role}`} className="rounded-sm border border-stone-200 p-4">
                <Field label="Role" value={job.role} />
                <Field label="Company" value={job.company} />
                <Field label="Summary" value={job.summary ?? ""} multiline />
              </div>
            ))}
          </Panel>
        </section>

        <aside className="space-y-6">
          <Panel title="Skills">
            {data.skills.map((skill) => (
              <Field key={`${skill.category}-${skill.name}`} label={skill.category} value={skill.name} />
            ))}
          </Panel>

          <Panel title="Projects">
            {data.projects.map((project) => (
              <Field key={project.name} label={project.name} value={project.description} multiline />
            ))}
          </Panel>
        </aside>
      </form>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-sm border border-stone-200 bg-white p-5">
      <h2 className="mb-5 text-lg font-semibold text-stone-950">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      {multiline ? (
        <textarea
          className="mt-2 min-h-28 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-700"
          defaultValue={value}
          disabled
        />
      ) : (
        <input
          className="mt-2 h-10 w-full rounded-sm border border-stone-300 bg-stone-50 px-3 text-sm text-stone-700"
          defaultValue={value}
          disabled
        />
      )}
    </label>
  );
}
