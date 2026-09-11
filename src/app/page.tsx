
import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness, NotebookPen, Compass } from "lucide-react";
const chapters = [
  { number: "01", name: "Work", href: "/cv", icon: BriefcaseBusiness, note: "Building things that matter.", description: "Professional background, projects, and the thinking behind the work.", action: "Explore my background" },
  { number: "02", name: "Writing", href: "/blog", icon: NotebookPen, note: "Thinking out loud.", description: "A notebook for ideas about technology, work, and everything in between.", action: "Open the notebook" },
  { number: "03", name: "Hobbies", href: "/hobbies", icon: Compass, note: "Life beyond the workday.", description: "Cooking, adventure, making, home projects, music, singing, and photography.", action: "Explore my hobbies" },
];
export default function Home() {
  return <main id="main-content" className="home-page">
    <section className="introduction">
      <div className="eyebrow"><span className="little-dot" /> A PERSONAL CORNER OF THE INTERNET</div>
      <h1>Lucas Bunt<span className="title-dot">.</span></h1>
      <div className="intro-bottom">
        <p>Work, life, and the<br /><em>interesting bits between.</em></p>
        <span className="intro-note">A home for what I build,<br />think about, cook, and explore.</span>
      </div>
    </section>
    <section className="chapters main-chapters" aria-label="Explore my website">
      {chapters.map(({ number, name, href, icon: Icon, note, description, action }) => <a href={href} key={name} className={"chapter chapter-" + name.toLowerCase()}>
        <div className="chapter-top"><span>{number} / {name.toUpperCase()}</span><Icon size={22} strokeWidth={1.4} /></div>
        <h2>{name}</h2><p className="chapter-note">{note}</p><p className="chapter-description">{description}</p>
        <div className="chapter-action">{action}<ArrowUpRight size={19} /></div>
      </a>)}
    </section>
    <Image className="editorial-art" src="/editorial-banner.png" alt="An illustrated landscape connecting a notebook, laptop, cooking pot, and a winding mountain path." width={1774} height={887} />
    <div className="home-signoff"><span>Work, writing, and a life in between.</span><span>Thanks for stopping by.</span></div>
  </main>;
}

