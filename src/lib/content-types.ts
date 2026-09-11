import { hobbies } from "./hobbies";
export const categories = [{slug:"writing",title:"Writing"}, ...hobbies];
export type Attachment = {id:string; name:string; mime:string; alt:string};
export const recipeTags = ["Gluten free", "Dairy free", "Nut free", "Peanut free", "Tree nut free", "Egg free", "Soy free", "Sesame free", "Wheat free", "Fish free", "Shellfish free"] as const;
export type EntryContent = { recipeTags?:string[]; author?:string; date?:string; title:string; category:string; excerpt:string; body:string; ingredients:string; instructions:string; servings:string; time:string; assets:Attachment[] };
export type Entry = {id:string; category:string; draft:EntryContent; published:EntryContent|null; publishedAt:string|null; updatedAt:string; version:number};
export const emptyContent = (category="writing"):EntryContent => ({title:"",category,excerpt:"",body:"",ingredients:"",instructions:"",servings:"",time:"",assets:[]});
export function validateContent(value:unknown, publishing=false): EntryContent {
  if(!value || typeof value!=="object") throw new Error("Content is required.");
  const v=value as Record<string,unknown>;
  const result=emptyContent();
  const tags=v.recipeTags??[];
  if(!Array.isArray(tags)||tags.length>recipeTags.length||tags.some(tag=>typeof tag!=="string"||!recipeTags.includes(tag as typeof recipeTags[number]))) throw new Error("Choose valid recipe tags.");
  result.recipeTags=recipeTags.filter(tag=>tags.includes(tag));
  for(const key of ["author","date"] as const){
    if(v[key]!==undefined && typeof v[key]!=="string") throw new Error(`Invalid ${key}.`);
    result[key]=((v[key] as string|undefined)??"").trim();
  }
  if(result.author!.length>200) throw new Error("Author is too long (maximum 200 characters).");
  if(result.date && (!/^\d{4}-\d{2}-\d{2}$/.test(result.date) || !Number.isFinite(Date.parse(result.date)) || new Date(result.date).toISOString().slice(0,10)!==result.date)) throw new Error("Choose a valid date.");
  for(const key of ["title","category","excerpt","body","ingredients","instructions","servings","time"] as const){
    if(typeof v[key]!=="string") throw new Error("Please complete the content fields.");
    const limit=["body","ingredients","instructions"].includes(key)?50000: key==="excerpt"?600:200;
    if(v[key].length>limit) throw new Error(`${key} is too long (maximum ${limit} characters).`);
    result[key]=v[key].trim();
  }
  if(!categories.some(c=>c.slug===result.category)) throw new Error("Choose a valid category.");
  if(!Array.isArray(v.assets)||v.assets.length>20) throw new Error("Use up to 20 attachments per entry.");
  result.assets=v.assets.map(a=>{
    if(!a || typeof a.id!=="string" || !/^[a-f0-9-]{36}$/.test(a.id) || typeof a.alt!=="string" || a.alt.length>500) throw new Error("An attachment is invalid.");
    return {id:a.id,alt:a.alt.trim(),name:"",mime:""};
  });
  if(publishing){
    if(!result.title) throw new Error("Add a title before publishing.");
    if(!result.body&&!result.ingredients&&!result.assets.length) throw new Error("Add some content before publishing.");
    if(result.category==="cooking-recipes"&&(!result.ingredients||!result.instructions)) throw new Error("Add ingredients and instructions before publishing a recipe.");
  }
  return result;
}
