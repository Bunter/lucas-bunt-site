import assert from 'node:assert/strict';
const base=process.env.OWNER_TEST_URL||'http://localhost:3000';
assert.ok(['localhost','127.0.0.1'].includes(new URL(base).hostname),'Run only against a local test database');
assert.ok(process.env.OWNER_TEST_PASSWORD,'Set OWNER_TEST_PASSWORD');
let cookie='';
async function req(path,options={}){return fetch(base+path,{...options,headers:{...(cookie?{cookie}:{}),...options.headers}});}
async function action(input){const r=await req('/api/entries',{method:'POST',headers:{'Content-Type':'application/json',Origin:base},body:JSON.stringify(input)});const body=await r.json();return {status:r.status,body};}
assert.equal((await req('/api/entries')).status,401,'anonymous cannot list drafts');
assert.equal((await req('/api/entries',{headers:{'oai-authenticated-user-id':'local_seedy','oai-authenticated-user-email':'seedy@sites.test'}})).status,401,'spoofed headers rejected');
const login=await req('/api/login',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({username:process.env.OWNER_TEST_USERNAME||'Bunter',password:process.env.OWNER_TEST_PASSWORD})});assert.equal(login.status,200,await login.clone().text());cookie=login.headers.get('set-cookie')?.split(';')[0];assert.ok(cookie,'session cookie');assert.ok(login.headers.get('set-cookie').includes('HttpOnly'));assert.ok(login.headers.get('set-cookie').includes('SameSite=Strict'));
assert.equal((await req('/api/entries')).status,200,'owner can list');
const csrf=await req('/api/entries',{method:'POST',headers:{Origin:'https://example.com','Content-Type':'application/json'},body:'{}'});assert.equal(csrf.status,403);
const content={author:'Test Writer',date:'2024-02-29',title:'Workspace verification',category:'writing',excerpt:'Temporary test',body:'First published text',ingredients:'',instructions:'',servings:'',time:'',assets:[]};
let r=await action({action:'save',content});assert.equal(r.status,200,JSON.stringify(r));const id=r.body.id;
try{
 let list=await (await req('/api/entries')).json();let row=list.find(e=>e.id===id);assert.ok(row);assert.equal(row.draft.author,'Test Writer');assert.equal(row.draft.date,'2024-02-29');
 assert.equal((await fetch(base+'/posts/'+id)).status,404,'draft invisible');
 const form=new FormData();form.set('file',new File([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=','base64')],'test.png',{type:'image/png'}));
 const upload=await req('/api/uploads',{method:'POST',headers:{Origin:base},body:form});assert.equal(upload.status,200);const asset=await upload.json();content.assets=[{...asset,alt:'A small test image'}];
 assert.equal((await fetch(base+'/media/'+asset.id)).status,404,'unpublished image private');assert.equal((await req('/media/'+asset.id)).status,200);
 r=await action({action:'publish',id,version:row.version,content});assert.equal(r.status,200,JSON.stringify(r));
 const publishedPage=await fetch(base+'/posts/'+id);assert.equal(publishedPage.status,200);const publishedHtml=await publishedPage.text();assert.ok(publishedHtml.includes('Test Writer'));assert.ok(publishedHtml.includes('February 29, 2024'));assert.equal((await fetch(base+'/media/'+asset.id)).status,200);
 list=await (await req('/api/entries')).json();row=list.find(e=>e.id===id);
 const oldVersion=row.version;
 r=await action({action:'save',id,version:row.version,content:{...content,body:'PRIVATE DRAFT REVISION'}});assert.equal(r.status,200);
 const publicHTML=await (await fetch(base+'/posts/'+id)).text();assert.ok(publicHTML.includes('First published text'));assert.ok(!publicHTML.includes('PRIVATE DRAFT REVISION'),'draft edits do not leak');
 assert.equal((await action({action:'save',id,version:oldVersion,content})).status,409,'stale saves rejected');
 list=await (await req('/api/entries')).json();row=list.find(e=>e.id===id);
 assert.equal((await action({action:'publish',id,version:row.version,content:{...content,category:'cooking-recipes'}})).status,400,'incomplete recipe rejected');
 r=await action({action:'publish',id,version:row.version,content:{...content,category:'cooking-recipes',ingredients:'1 cup flour',instructions:'Mix and bake'}});assert.equal(r.status,200);
 const recipe=await (await fetch(base+'/hobbies/cooking-recipes')).text();assert.ok(recipe.includes('Workspace verification'));
 list=await (await req('/api/entries')).json();row=list.find(e=>e.id===id);
 assert.equal((await action({action:'unpublish',id,version:row.version})).status,200);assert.equal((await fetch(base+'/posts/'+id)).status,404);assert.equal((await fetch(base+'/media/'+asset.id)).status,404);
 console.log('PASS: authentication, header spoofing, CSRF, drafts, uploads, publication, draft isolation, conflict protection, recipe validation, category listing, unpublishing.');
}finally{const list=await (await req('/api/entries')).json();const row=list.find(e=>e.id===id);if(row)await action({action:'delete',id,version:row.version});}

const logout=await req('/api/logout',{method:'POST',headers:{Origin:base},redirect:'manual'});assert.equal(logout.status,303);assert.equal((await req('/api/entries')).status,401,'logout revokes the saved token');
for(let i=0;i<11;i++){const r=await req('/api/login',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({username:'Bunter',password:'invalid-test-password'})});assert.equal(r.status,i<10?401:429);}
console.log('PASS: password login, session cookie protections, logout revocation, failed-login throttling.');
