import { env } from "cloudflare:workers";
import type { Entry, EntryContent } from "./content-types";
export function database(){ if(!env.DB) throw new Error("Content storage is unavailable.");return env.DB; }
export function bucket(){if(!env.BUCKET) throw new Error("Upload storage is unavailable.");return env.BUCKET;}
type Row={id:string;category:string;draft:string;published:string|null;published_at:string|null;updated_at:string;version:number};
export function decode(row:Row):Entry{return {id:row.id,category:row.category,draft:JSON.parse(row.draft),published:row.published?JSON.parse(row.published):null,publishedAt:row.published_at,updatedAt:row.updated_at,version:row.version};}
export async function listEntries(){ const rows=await database().prepare("SELECT * FROM entries ORDER BY updated_at DESC").all<Row>();return rows.results.map(decode); }
export async function publishedEntries(category:string){const rows=await database().prepare("SELECT id, published, published_at FROM entries WHERE json_extract(published,'$.category')=? AND published IS NOT NULL ORDER BY published_at DESC").bind(category).all<{id:string;published:string;published_at:string}>();return rows.results.map(r=>({id:r.id,content:JSON.parse(r.published) as EntryContent,publishedAt:r.published_at}));}
export async function publicEntry(id:string){ const r=await database().prepare("SELECT published, published_at FROM entries WHERE id=? AND published IS NOT NULL").bind(id).first<{published:string;published_at:string}>();if(!r)return null;const content=JSON.parse(r.published) as EntryContent;return {...content,date:content.date||r.published_at?.slice(0,10)}; }
