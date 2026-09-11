import { notFound } from "next/navigation";
import Link from "next/link";
import { publicEntry } from "@/lib/content-store";
import { EntryBody } from "@/components/entry-body";
export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const c=await publicEntry((await params).id);return {title:c?.title??"Entry not found",description:c?.excerpt};}
export default async function Page({params}:{params:Promise<{id:string}>}){const c=await publicEntry((await params).id);if(!c)notFound();return <main id="main-content" className="section-page"><Link className="text-link" href={c.category==="writing"?"/blog":`/hobbies/${c.category}`}>← Back to {c.category==="writing"?"Writing":"Hobbies"}</Link><EntryBody content={c}/></main>;}
