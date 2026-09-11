import { PublishedEntries } from "@/components/published-entries";
export const metadata = { title: "Writing", description: "Notes on work, technology, and ideas from Lucas Bunt." };
export const dynamic="force-dynamic";
export default function BlogPage() { return <main id="main-content" className="section-page"><p className="eyebrow">02 / WRITING</p><h1>Thinking out loud.</h1><p className="section-lead">Notes on work, technology, and ideas worth sitting with.</p><PublishedEntries category="writing"/></main>; }

