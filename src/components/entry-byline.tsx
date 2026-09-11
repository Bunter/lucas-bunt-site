export function EntryByline({author,date}:{author?:string;date?:string}) {
  if(!author&&!date)return null;
  return <p className="small-note">{author&&<span>By {author}</span>}{author&&date&&" · "}{date&&<time dateTime={date}>{new Date(date).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})}</time>}</p>;
}
