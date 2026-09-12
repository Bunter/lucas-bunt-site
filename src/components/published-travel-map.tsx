import {publishedEntries} from "@/lib/content-store";
import {TravelMap} from "./travel-map";
export async function PublishedTravelMap(){
 try {const entries=await publishedEntries("travel-log");return <TravelMap visits={entries.flatMap(entry=>entry.content.mapVisit?[{...entry.content.mapVisit,note:entry.content.body,postId:entry.id}]:[])}/>;}
 catch(error){console.error(error);return <><p role="status">Recent map updates are temporarily unavailable.</p><TravelMap/></>;}
}
