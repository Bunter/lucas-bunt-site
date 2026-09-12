import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { CvData, formatDateRange } from "@/lib/cv-data";

export function CvPage({ data }: { data: CvData }) {
  const skillGroups = Object.groupBy(data.skills, (skill) => skill.category);
  return (
    <main id="main-content" className="section-page work-page">
      <p className="eyebrow">01 / WORK</p>
      <h1>Building things<br /><em>that matter.</em></h1>
      {data.profile.photoUrl && <Image src={data.profile.photoUrl} alt={data.profile.name} width={160} height={160} />}
      <p className="section-lead">{data.profile.headline}</p>
      {data.profile.location && <p className="work-location"><MapPin size={16} aria-hidden="true" />{data.profile.location}</p>}
      <p className="work-summary">{data.profile.summary}</p>
      <div className="cv-links">
        {data.profile.linkedinUrl && <a className="text-link" href={data.profile.linkedinUrl}>Find me on LinkedIn <ArrowUpRight size={16} /></a>}
        {data.profile.githubUrl && <a className="text-link" href={data.profile.githubUrl}>Explore my GitHub <ArrowUpRight size={16} /></a>}
        {data.profile.email && <a className="text-link" href={"mailto:" + data.profile.email}>Email me <ArrowUpRight size={16} /></a>}
        {data.profile.resumeUrl && <a className="text-link" href={data.profile.resumeUrl}>Download CV <ArrowUpRight size={16} /></a>}
      </div>
      <div className="work-columns">
        <section className="cv-panel" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          {data.workExperiences.length ? data.workExperiences.map((job) => (
            <article className="work-role" key={job.company + job.role}>
              <p className="work-dates">{formatDateRange(job.startDate, job.endDate, job.isCurrent)}{job.isCurrent && <span className="current-role">Current</span>}</p>
              <h3>{job.role}</h3>
              <p className="work-company">{job.company}</p>
              {job.location && <p className="work-role-location">{job.location}</p>}
              {job.summary && <p>{job.summary}</p>}
              {job.highlights.length > 0 && <ul className="work-highlights">{job.highlights.map((highlight) => <li key={highlight.body}>{highlight.body}</li>)}</ul>}
            </article>
          )) : <p>A fuller work history is on its way. You can find my professional background on LinkedIn in the meantime.</p>}
        </section>
        <aside className="work-sidebar" aria-label="Skills, education, certifications, and projects">
          {data.skills.length > 0 && <section className="cv-panel"><h2>Core skills</h2>{Object.entries(skillGroups).map(([category, skills]) => <div className="work-skill-group" key={category}><h3>{category}</h3><ul>{skills?.map((skill) => <li key={skill.name}>{skill.name}</li>)}</ul></div>)}</section>}
          {data.education.length > 0 && <section className="cv-panel"><h2>Education</h2>{data.education.map((item) => <article className="work-education" key={item.institution}><h3>{item.institution}</h3>{(item.degree || item.field) && <p>{[item.degree, item.field].filter(Boolean).join(", ")}</p>}{item.dateLabel ? <p className="work-dates">{item.dateLabel}</p> : item.startDate && <p className="work-dates">{formatDateRange(item.startDate, item.endDate)}</p>}{item.summary && <p>{item.summary}</p>}</article>)}</section>}
          {Boolean(data.certifications?.length) && <section className="cv-panel"><h2>Certifications</h2>{data.certifications?.map((item) => <article className="work-education" key={item.name}><h3>{item.name}</h3><p>{item.issuer}</p><p className="work-dates">Issued {item.issued}</p>{item.credentialId&&<p className="small-note">Credential ID: {item.credentialId}</p>}</article>)}</section>}
          {data.projects.length > 0 && <section className="cv-panel"><h2>Projects</h2>{data.projects.map((project) => <article className="cv-project" key={project.name}><h3>{project.name}</h3><p>{project.description}</p>{project.url && <a className="text-link mt-4" href={project.url}>View project <ArrowUpRight size={16} /></a>}</article>)}</section>}
        </aside>
      </div>
    </main>
  );
}
