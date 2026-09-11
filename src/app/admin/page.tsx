import {ownerStatus} from '@/lib/owner';
import {listEntries} from '@/lib/content-store';
import {OwnerWorkspace} from '@/components/owner-workspace';
import {OwnerLogin} from '@/components/owner-login';
export const dynamic='force-dynamic';
export const metadata={title:'Owner workspace',robots:{index:false,follow:false}};
export default async function Page(){try{
 if(!(await ownerStatus()).allowed)return <OwnerLogin/>;
 return <OwnerWorkspace initialEntries={await listEntries()} signOutUrl='/api/logout' local={import.meta.env.DEV}/>;
}catch(e){console.error(e);return <main id='main-content' className='section-page'><h1>We'll be right back.</h1><p>The workspace couldn't connect to storage. Please reload in a moment.</p><a href='/admin'>Try again</a></main>;}}
