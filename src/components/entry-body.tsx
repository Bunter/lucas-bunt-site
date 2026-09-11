import type { EntryContent } from "@/lib/content-types";
export function EntryBody({content}:{content:EntryContent}){return <article className="entry-body">
  <p className="eyebrow">{content.category.replaceAll("-"," / ")}</p><h1>{content.title||"Untitled draft"}</h1>
  {content.excerpt&&<p className="section-lead">{content.excerpt}</p>}
  {content.assets.filter(a=>a.mime.startsWith("image/")).map(a=><figure key={a.id}><img src={`/media/${a.id}`} alt={a.alt} loading="lazy"/>{a.alt&&<figcaption>{a.alt}</figcaption>}</figure>)}
  {content.body&&<div className="entry-prose">{content.body.split(/\n\s*\n/).map((p,i)=><p key={i}>{p}</p>)}</div>}
  {content.category==="cooking-recipes"&&<section className="recipe-content"><div className="recipe-meta">{content.servings&&<span>Serves {content.servings}</span>}{content.time&&<span>{content.time}</span>}</div><h2>Ingredients</h2><ul>{content.ingredients.split("\n").filter(Boolean).map((s,i)=><li key={i}>{s}</li>)}</ul><h2>Instructions</h2><ol>{content.instructions.split("\n").filter(Boolean).map((s,i)=><li key={i}>{s}</li>)}</ol></section>}
  {content.assets.filter(a=>!a.mime.startsWith("image/")).map(a=><a className="text-link" key={a.id} href={`/media/${a.id}`}>Download {a.name} ↗</a>)}
</article>;}
