import { authorize } from "@/lib/owner";
import { bucket, database } from "@/lib/content-store";
import {limitedBody} from "@/lib/request-body";
function mimeOf(b:Uint8Array){if(b[0]===255&&b[1]===216&&b[2]===255)return "image/jpeg";if(b.slice(0,8).join(",")==="137,80,78,71,13,10,26,10")return "image/png";const s=new TextDecoder().decode(b.slice(0,12));if(s.startsWith("RIFF")&&s.slice(8,12)==="WEBP")return "image/webp";if(s.startsWith("%PDF-"))return "application/pdf";return null;}
export async function POST(request:Request){try{
  const denied=await authorize(request);if(denied)return denied;
  if(Number(request.headers.get("content-length"))>11000000)return Response.json({error:"Please choose a file smaller than 10 MB."},{status:413});
  let body;try{body=await limitedBody(request,11000000);}catch{return Response.json({error:"Please choose a file smaller than 10 MB."},{status:413});}
  const form=await new Response(body,{headers:{"Content-Type":request.headers.get("content-type")||""}}).formData();const file=form.get("file");
  if(!(file instanceof File)||file.size>10*1024*1024||!file.size)return Response.json({error:"Choose a JPG, PNG, WebP, or PDF up to 10 MB."},{status:400});
  const bytes=await file.arrayBuffer();const mime=mimeOf(new Uint8Array(bytes));
  if(!mime)return Response.json({error:"Only JPG, PNG, WebP, and PDF files are supported."},{status:400});
  const id=crypto.randomUUID(),name=file.name.slice(0,200);await bucket().put(id,bytes,{httpMetadata:{contentType:mime}});
  try{await database().prepare("INSERT INTO assets(id,name,mime,size,created_at) VALUES(?,?,?,?,?)").bind(id,name,mime,file.size,new Date().toISOString()).run();}catch(e){await bucket().delete(id);throw e;}
  return Response.json({id,name,mime,alt:""});
}catch(e){console.error(e);return Response.json({error:"Upload failed. Please try again."},{status:503});}}
