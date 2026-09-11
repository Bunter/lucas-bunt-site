import { EntryByline } from "./entry-byline";

import { publishedEntries } from "@/lib/content-store";
export async function PublishedEntries({category}:{category:string}){
  try{const entries=await publishedEntries(category);if(!entries.length)return <div className="empty-note"><div><h2>The first entry is still to come.</h2><p>This collection is just getting started. Check back for something new.</p></div></div>;
    return <div className="published-grid">{entries.map(({id,content,publishedAt})=><a href={`/posts/${id}`} className="published-card" key={id}>{content.assets.find(a=>a.mime.startsWith("image/"))&&<img src={`/media/${content.assets.find(a=>a.mime.startsWith("image/"))!.id}`} alt={content.assets.find(a=>a.mime.startsWith("image/"))!.alt} loading="lazy"/>}<EntryByline author={content.author} date={content.date||publishedAt}/><h2>{content.title}</h2>{content.category==="restaurant-reviews"&&content.restaurant?.ratings.Total!==undefined&&<span aria-label={`Total rating ${content.restaurant.ratings.Total.toFixed(1)} out of 5`}>★ {content.restaurant.ratings.Total.toFixed(1)} / 5</span>}<p>{content.excerpt}</p><span>Read more ↗</span></a>)}</div>;
  }catch(e){console.error(e);return <div className="empty-note"><p>Entries are temporarily unavailable. Please try again shortly.</p></div>;}
}
