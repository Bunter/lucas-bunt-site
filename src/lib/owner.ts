import {env} from 'cloudflare:workers';
import {cookies} from 'next/headers';
import {database} from './content-store';
export const sessionCookie='owner_session';
export function credentials(){const e=env as unknown as {OWNER_USERNAME?:string;OWNER_PASSWORD_HASH?:string};return {username:e.OWNER_USERNAME,passwordHash:e.OWNER_PASSWORD_HASH};}
export async function digest(value:string){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');}
export async function verifyPassword(password:string,encoded:string){
 const [algorithm,iterations,salt,expected]=encoded.split('$');
 if(algorithm!=='pbkdf2-sha256'||iterations!=='100000'||!salt||!expected)return false;
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
 const derived=await crypto.subtle.deriveBits({name:'PBKDF2',salt:new TextEncoder().encode(salt),iterations:Number(iterations),hash:'SHA-256'},key,256);
 const actual=Array.from(new Uint8Array(derived),b=>b.toString(16).padStart(2,'0')).join('');
 let difference=actual.length^expected.length;for(let i=0;i<actual.length;i++)difference|=actual.charCodeAt(i)^(expected.charCodeAt(i)||0);return difference===0;
}
export async function ownerStatus(){
 const token=(await cookies()).get(sessionCookie)?.value;
 const {username,passwordHash}=credentials();
 if(!token||!username||!passwordHash||!/^[a-f0-9]{64}$/.test(token))return {user:null,allowed:false};
 const row=await database().prepare('SELECT credential_version FROM owner_sessions WHERE token_hash=? AND expires_at>?').bind(await digest(token),Date.now()).first<{credential_version:string}>();
 const allowed=!!row&&row.credential_version===await digest(passwordHash);
 return {user:allowed?{username}:null,allowed};
}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin;}
export async function authorize(request:Request){
 if(!['GET','HEAD'].includes(request.method)&&!sameOrigin(request))return Response.json({error:'Please submit changes from this website.'},{status:403});
 if(!(await ownerStatus()).allowed)return Response.json({error:'Please sign in again.'},{status:401});
 return null;
}
