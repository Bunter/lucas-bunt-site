import { publishedEntries } from "@/lib/content-store";
export async function FoodAlbum(){
  try {
    const groups=await Promise.all([publishedEntries("cooking-recipes"),publishedEntries("food-photos")]);
    const entries=groups.flat().sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));
    const photos=entries.flatMap(entry=>entry.content.assets.filter(asset=>asset.mime.startsWith("image/")).map(asset=>({entry,asset})));
    return <section className="food-album" id="food-album"><h2>Foods I made</h2><p>Kitchen experiments, favorite meals, and recipes worth making again.</p>{photos.length?<div className="food-photo-grid">{photos.map(({entry,asset})=><a key={`${entry.id}-${asset.id}`} href={`/posts/${entry.id}`}><figure><img src={`/media/${asset.id}`} alt={asset.alt} loading="lazy"/><figcaption><strong>{entry.content.title}</strong>{asset.alt&&<p>{asset.alt}</p>}<span>{entry.content.category==="cooking-recipes"?"View recipe ↗":"View food photos ↗"}</span></figcaption></figure></a>)}</div>:<p className="empty-note">The first food photos are still to come.</p>}</section>;
  }catch(error){console.error(error);return <section className="food-album" id="food-album"><h2>Foods I made</h2><p>Photos are temporarily unavailable. Please try again shortly.</p></section>;}
}
