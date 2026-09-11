
import { ArrowLeft } from "lucide-react";
import { hobbies } from "@/lib/hobbies";
import { PublishedEntries } from "./published-entries";
import { FoodAlbum } from "./food-album";
export function HobbyPage({slug}: {slug: (typeof hobbies)[number]["slug"]}) {
  const hobby=hobbies.find(item=>item.slug===slug)!;
  return <main id="main-content" className="section-page">
    <a className="text-link" href="/hobbies"><ArrowLeft size={16}/> All hobbies</a>
    <p className="eyebrow mt-10">HOBBIES</p><h1>{hobby.title}</h1><p className="section-lead">{hobby.description}</p>
    {slug==="cooking-recipes"&&<div className="food-story entry-prose">
      <p>Some of my favorite childhood memories are of visiting family for the holidays and learning what everyone loved to cook. On my dad’s side, that love came down from my great-grandmother to my grandmother, to him, and then to me.</p>
      <p>My mother grew up in Paris, where much of my family still lives. My grandparents had a small farm in the south of France, growing food and preserving it for winter. I remember thumbing through old, splattered cookbooks with them, discovering dinner ideas, then heading to the Parisian markets to find the best ingredients. They always had a personal relationship with the vendor, and it made me feel really connected to the culture.</p>
      <p>Those memories shaped how I cook, how I travel, and how I live. For decades now, I’ve explored places through their markets and kitchens, taking culinary classes everywhere from the famous Le Cordon Bleu in Paris and the culinary institute of Bologna to pizza kitchens in Naples, Chef Leez in Bangkok, and various kitchens across Colombia, Mexico, and Europe. Learning to cook someone’s food has become my favorite way to get to know their culture.</p>
      <p>Here, I’ll share family recipes; dishes I’ve brought home from my travels; techniques I’ve picked up; and recipes I’ve made my own. Along with a few opinions, of course, and some reviews of some of the great restaurants I’ve visited. It’s a collection of the food, people, and places that have made me the cook I am.</p>
    </div>}
    <nav className="hobby-nav" aria-label="Hobby categories">{hobbies.map(item=><a key={item.slug} href={"/hobbies/"+item.slug} aria-current={item.slug===slug ? "page" : undefined}>{item.title}</a>)}</nav>
    {slug==="cooking-recipes"?<><nav className="hobby-nav" aria-label="Food sections"><a href="#recipes">Recipes</a><a href="#food-album">Foods I made</a><a href="#restaurant-reviews">Restaurant reviews</a></nav><section id="recipes"><h2 className="food-section-title">Recipes</h2><PublishedEntries category={slug}/></section></>:<PublishedEntries category={slug}/>}
    {slug==="cooking-recipes"&&<><FoodAlbum/><section className="food-album" id="restaurant-reviews"><h2>Restaurant reviews</h2><p>Where I ate, what I loved, and how it measured up.</p><PublishedEntries category="restaurant-reviews"/></section></>}
  </main>;
}

