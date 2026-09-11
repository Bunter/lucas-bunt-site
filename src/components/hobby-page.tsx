
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
    {slug==="cooking-recipes"?<><nav className="hobby-nav" aria-label="Food sections"><a href="#recipes">Recipes</a><a href="#food-album">Foods I made</a><a href="#restaurant-reviews">Restaurant reviews</a></nav><section id="recipes"><h2 className="food-section-title">Recipes</h2><PublishedEntries category={slug}/></section></>:<PublishedEntries category={slug}/>}
    {slug==="cooking-recipes"&&<><FoodAlbum/><section className="food-album" id="restaurant-reviews"><h2>Restaurant reviews</h2><p>Where I ate, what I loved, and how it measured up.</p><PublishedEntries category="restaurant-reviews"/></section></>}
  </main>;
}

