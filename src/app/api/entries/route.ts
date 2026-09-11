import { authorize } from "@/lib/owner";
import { database, listEntries } from "@/lib/content-store";
import { validateContent } from "@/lib/content-types";
import {limitedBody} from "@/lib/request-body";
export async function GET(request:Request){try{const denied=await authorize(request);if(denied)return denied;return Response.json(await listEntries(),{headers:{"Cache-Control":"no-store"}});}catch(e){console.error(e);return Response.json({error:"Couldn't load your entries. Try again."},{status:503});}}
export async function POST(request:Request){
  try{
    const denied=await authorize(request);if(denied)return denied;
    let raw;try{raw=new TextDecoder().decode(await limitedBody(request,260000));}catch{return Response.json({error:"This entry is too large."},{status:413});}
    let input;try{input=JSON.parse(raw);}catch{return Response.json({error:"Invalid content."},{status:400});}
    const {action,id,version}=input;
    if(!["save","publish","unpublish","delete"].includes(action))return Response.json({error:"Invalid action."},{status:400});
    if(id&&(!/^[a-f0-9-]{36}$/.test(id)||!Number.isInteger(version)))return Response.json({error:"Invalid entry."},{status:400});
    const db=database();
    if(id){const current=await db.prepare("SELECT version FROM entries WHERE id=?").bind(id).first<{version:number}>();if(!current)return Response.json({error:"Entry not found."},{status:404});if(current.version!==version)return Response.json({error:"This entry changed in another window. Reload it before saving."},{status:409});}
    const now=new Date().toISOString();let result;
    if(action==="delete"||action==="unpublish"){
      if(!id)return Response.json({error:"Save this entry first."},{status:400});
      result=action==="delete"?await db.prepare("DELETE FROM entries WHERE id=? AND version=?").bind(id,version).run():await db.prepare("UPDATE entries SET published=NULL,published_at=NULL,updated_at=?,version=version+1 WHERE id=? AND version=?").bind(now,id,version).run();
    }else{
      let content;try{content=validateContent(input.content,action==="publish");}catch(e){return Response.json({error:(e as Error).message},{status:400});}
      for(const a of content.assets){const row=await db.prepare("SELECT name,mime FROM assets WHERE id=?").bind(a.id).first<{name:string;mime:string}>();if(!row)return Response.json({error:"An attachment is missing. Upload it again."},{status:400});a.name=row.name;a.mime=row.mime;if(action==="publish"&&a.mime.startsWith("image/")&&!a.alt)return Response.json({error:"Add a description for each photo before publishing."},{status:400});}
      if(action==="publish"&&["photography","food-photos"].includes(content.category)&&!content.assets.some(a=>a.mime.startsWith("image/")))return Response.json({error:"Add a photo before publishing."},{status:400});
      const json=JSON.stringify(content);
      if(!id){const newId=crypto.randomUUID();await db.prepare("INSERT INTO entries(id,category,draft,published,published_at,updated_at,version) VALUES(?,?,?,?,?,?,1)").bind(newId,content.category,json,action==="publish"?json:null,action==="publish"?now:null,now).run();return Response.json({id:newId});}
      result=action==="publish"?await db.prepare("UPDATE entries SET category=?,draft=?,published=?,published_at=COALESCE(published_at,?),updated_at=?,version=version+1 WHERE id=? AND version=?").bind(content.category,json,json,now,now,id,version).run():await db.prepare("UPDATE entries SET category=?,draft=?,updated_at=?,version=version+1 WHERE id=? AND version=?").bind(content.category,json,now,id,version).run();
    }
    if(result.meta.changes===0)return Response.json({error:"This entry changed in another window. Reload it before saving."},{status:409});
    return Response.json({id});
  }catch(e){console.error(e);return Response.json({error:"Couldn't save your changes. Your text is still here; please try again."},{status:503});}
}
