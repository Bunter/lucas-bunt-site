import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { hobbies } from "@/lib/hobbies";
export function HobbyPage({slug}: {slug: (typeof hobbies)[number]["slug"]}) {
  const hobby=hobbies.find(item=>item.slug===slug)!;
  return <main id="main-content" className="section-page">
    <Link className="text-link" href="/hobbies"><ArrowLeft size={16}/> All hobbies</Link>
    <p className="eyebrow mt-10">HOBBIES</p><h1>{hobby.title}</h1><p className="section-lead">{hobby.description}</p>
    <nav className="hobby-nav" aria-label="Hobby categories">{hobbies.map(item=><Link key={item.slug} href={"/hobbies/"+item.slug} aria-current={item.slug===slug ? "page" : undefined}>{item.title}</Link>)}</nav>
    <div className="empty-note"><div><h2>The first entry is still to come.</h2><p>This little collection is just getting started. Check back for something new.</p></div></div>
  </main>;
}

