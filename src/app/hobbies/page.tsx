
import { ArrowUpRight, Camera, CookingPot, Compass, Hammer, House, Music } from "lucide-react";
import { hobbies } from "@/lib/hobbies";
export const metadata = { title: "Hobbies", description: "Cooking, travel, making, home projects, music, singing, and photography with Lucas Bunt." };
const icons = { cooking: CookingPot, travel: Compass, maker: Hammer, home: House, music: Music, photography: Camera };
export default function HobbiesPage() {
  return <main id="main-content" className="section-page">
    <p className="eyebrow">03 / HOBBIES</p>
    <h1>Life beyond<br /><em>the workday.</em></h1>
    <p className="section-lead">A place for the things I make, the places I explore, and the interests that make life fuller.</p>
    <div className="hobby-grid">{hobbies.map((hobby) => { const Icon=icons[hobby.icon]; return <a className="hobby-card" key={hobby.slug} href={"/hobbies/"+hobby.slug}>
      <Icon size={26} strokeWidth={1.4} aria-hidden="true" /><h2>{hobby.title}</h2><p>{hobby.description}</p><span>Explore <ArrowUpRight size={18}/></span>
    </a>; })}</div>
  </main>;
}

