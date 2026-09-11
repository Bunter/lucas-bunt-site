import { bucket, database } from "@/lib/content-store";
import { ownerStatus } from "@/lib/owner";
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
  try{const {id}=await params;if(!/^[a-f0-9-]{36}$/.test(id))return new Response("Not found",{status:404});
    const published=await database().prepare("SELECT e.id FROM entries e,json_each(e.published,'$.assets') a WHERE e.published IS NOT NULL AND json_extract(a.value,'$.id')=? LIMIT 1").bind(id).first();
    if(!published&&!(await ownerStatus()).allowed)return new Response("Not found",{status:404});
    const meta=await database().prepare("SELECT name,mime FROM assets WHERE id=?").bind(id).first<{name:string;mime:string}>();if(!meta)return new Response("Not found",{status:404});
    const obj=await bucket().get(id);if(!obj)return new Response("Not found",{status:404});
    return new Response(obj.body,{headers:{"Content-Type":meta.mime,"X-Content-Type-Options":"nosniff","Cache-Control":"private, no-store","Content-Disposition":meta.mime==="application/pdf"?"attachment; filename*=UTF-8''"+encodeURIComponent(meta.name):"inline"}});
  }catch(e){console.error(e);return new Response("Media temporarily unavailable",{status:503});}
}
