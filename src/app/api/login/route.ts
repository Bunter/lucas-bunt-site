import {credentials,digest,sameOrigin,sessionCookie,verifyPassword} from "@/lib/owner";
import {database} from "@/lib/content-store";
import {limitedBody} from "@/lib/request-body";
export async function POST(request:Request){try{
 if(!sameOrigin(request))return Response.json({error:"Please sign in from this website."},{status:403});
 let text;try{text=new TextDecoder().decode(await limitedBody(request,2000));}catch{return Response.json({error:"Invalid login."},{status:413});}
 let input;try{input=JSON.parse(text);}catch{return Response.json({error:"Invalid login."},{status:400});}
 if(typeof input.username!=="string"||typeof input.password!=="string"||input.username.length>100||input.password.length>256)return Response.json({error:"Invalid login."},{status:400});
 const {username,passwordHash}=credentials();if(!username||!passwordHash)return Response.json({error:"Sign-in isn't configured yet. Please try again later."},{status:503});
 const db=database(),now=Date.now(),windowMs=15*60*1000;
 const key=await digest(request.headers.get("cf-connecting-ip")||"local-or-dispatch");
 const attempts=await db.prepare("INSERT INTO login_attempts(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=CASE WHEN expires_at<=? THEN 1 ELSE count+1 END,expires_at=CASE WHEN expires_at<=? THEN ? ELSE expires_at END RETURNING count,expires_at").bind(key,now+windowMs,now,now,now+windowMs).first<{count:number;expires_at:number}>();
 if(attempts&&attempts.count>10)return Response.json({error:"Too many sign-in attempts. Please try again in 15 minutes."},{status:429,headers:{"Retry-After":String(Math.ceil((attempts.expires_at-now)/1000))}});
 const valid=await verifyPassword(input.password,passwordHash);
 if(!valid||input.username!==username)return Response.json({error:"The username or password is incorrect."},{status:401});
 const token=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,"0")).join("");
 await db.batch([db.prepare("DELETE FROM owner_sessions WHERE expires_at<=?").bind(now),db.prepare("DELETE FROM login_attempts WHERE key=? OR expires_at<=?").bind(key,now),db.prepare("INSERT INTO owner_sessions(token_hash,expires_at,credential_version) VALUES(?,?,?)").bind(await digest(token),now+7*86400000,await digest(passwordHash))]);
 const secure=new URL(request.url).protocol==="https:"?"; Secure":"";
 return Response.json({ok:true},{headers:{"Set-Cookie":`${sessionCookie}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800${secure}`,"Cache-Control":"no-store"}});
 }catch(e){console.error(e);return Response.json({error:"Sign-in is temporarily unavailable. Please try again."},{status:503});}}
