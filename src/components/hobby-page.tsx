
import { ArrowLeft } from "lucide-react";
import { hobbies } from "@/lib/hobbies";
import { PublishedEntries } from "./published-entries";
import { FoodAlbum } from "./food-album";
export function HobbyPage({slug}: {slug: (typeof hobbies)[number]["slug"]}) {
  const hobby=hobbies.find(item=>item.slug===slug)!;
  return <main id="main-content" className="section-page">
    <a className="text-link" href="/hobbies"><ArrowLeft size={16}/> All hobbies</a>
    <p className="eyebrow mt-10">HOBBIES</p><h1>{hobby.title}</h1><p className="section-lead">{hobby.description}</p>
    <nav className="hobby-nav" aria-label="Hobby categories">{hobbies.map(item=><a key={item.slug} href={"/hobbies/"+item.slug} aria-current={item.slug===slug ? "page" : undefined}>{item.title}</a>)}</nav>
    <PublishedEntries category={slug}/>
    {slug==="cooking-recipes"&&<FoodAlbum/>}
  </main>;
}

