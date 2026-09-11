import {cookies} from "next/headers";
import {database} from "@/lib/content-store";
import {digest,sameOrigin,sessionCookie} from "@/lib/owner";
export async function POST(request:Request){if(!sameOrigin(request))return new Response("Forbidden",{status:403});const token=(await cookies()).get(sessionCookie)?.value;if(token)await database().prepare("DELETE FROM owner_sessions WHERE token_hash=?").bind(await digest(token)).run();return new Response(null,{status:303,headers:{Location:"/admin","Set-Cookie":`${sessionCookie}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${new URL(request.url).protocol==="https:"?"; Secure":""}`,"Cache-Control":"no-store"}});}
