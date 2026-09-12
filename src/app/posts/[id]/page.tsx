import { notFound } from "next/navigation";

import { publicEntry } from "@/lib/content-store";
import { EntryBody } from "@/components/entry-body";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const c=await publicEntry((await params).id);return {title:c?.title??"Entry not found",description:c?.excerpt};}
export default async function Page({params}:{params:Promise<{id:string}>}){const c=await publicEntry((await params).id);if(!c)notFound();return <main id="main-content" className="section-page"><a className="text-link" href={c.category==="writing"?"/blog":c.category==="travel-log"?"/hobbies/travel-adventure":c.category==="restaurant-reviews"?"/hobbies/cooking-recipes#restaurant-reviews":c.category==="food-photos"?"/hobbies/cooking-recipes#food-album":`/hobbies/${c.category}`}>← Back to {c.category==="writing"?"Writing":c.category==="travel-log"?"Travel map":c.category==="restaurant-reviews"?"Restaurant reviews":c.category==="food-photos"?"Foods I made":"Hobbies"}</a><EntryBody content={c}/></main>;}
