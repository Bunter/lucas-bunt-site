import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CvData, formatDateRange } from "@/lib/cv-data";
export function CvPage({data}: {data:CvData}) {
  return <main id="main-content" className="section-page">
    <p className="eyebrow">01 / WORK</p><h1>Building things<br /><em>that matter.</em></h1>
    {data.profile.photoUrl && <Image src={data.profile.photoUrl} alt={data.profile.name} width={160} height={160} />}
    <p className="section-lead">{data.profile.headline}</p>
    <p className="mt-5 max-w-2xl leading-8">{data.profile.summary}</p>
    <div className="cv-links">
      {data.profile.linkedinUrl && <a className="text-link" href={data.profile.linkedinUrl}>Find me on LinkedIn <ArrowUpRight size={16}/></a>}
      {data.profile.githubUrl && <a className="text-link" href={data.profile.githubUrl}>Explore my GitHub <ArrowUpRight size={16}/></a>}
      {data.profile.email && <a className="text-link" href={"mailto:"+data.profile.email}>Email me <ArrowUpRight size={16}/></a>}
      {data.profile.resumeUrl && <a className="text-link" href={data.profile.resumeUrl}>Download CV <ArrowUpRight size={16}/></a>}
    </div>
    <div className="cv-grid"><section className="cv-panel"><h2>Experience</h2>
      {data.workExperiences.length ? data.workExperiences.map(job=><article className="cv-project" key={job.company+job.role}><p>{formatDateRange(job.startDate,job.endDate,job.isCurrent)}</p><h3>{job.role}</h3><p>{job.company}{job.location ? " · "+job.location : ""}</p><p>{job.summary}</p><ul className="list-disc pl-5 mt-4 space-y-2">{job.highlights.map(h=><li key={h.body}>{h.body}</li>)}</ul></article>) : <p>A fuller work history is on its way. You can find my professional background on LinkedIn in the meantime.</p>}
    </section><section className="cv-panel"><h2>Projects</h2>{data.projects.map(project=><article className="cv-project" key={project.name}><h3>{project.name}</h3><p>{project.description}</p>{project.url && <a className="text-link mt-4" href={project.url}>View project <ArrowUpRight size={16}/></a>}</article>)}</section>
    {data.skills.length>0 && <section className="cv-panel"><h2>Skills</h2><div className="flex flex-wrap gap-3">{data.skills.map(s=><span className="border border-stone-300 px-3 py-2" key={s.category+s.name}>{s.name}</span>)}</div></section>}
    {data.education.length>0 && <section className="cv-panel"><h2>Education</h2>{data.education.map(e=><article key={e.institution}><h3>{e.institution}</h3><p>{[e.degree,e.field].filter(Boolean).join(", ")}</p><p>{e.summary}</p></article>)}</section>}
    </div>
  </main>;
}

