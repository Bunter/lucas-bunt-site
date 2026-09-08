import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export function ComingSoon({ icon: Icon, eyebrow, title, body }: { icon: React.ComponentType<{ className?: string }>; eyebrow: string; title: string; body: string }) {
  return <main id="main-content" className="section-page">
    <p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="section-lead">{body}</p>
    <div className="empty-note"><Icon className="h-7 w-7 shrink-0" /><div><h2>The first entry is still to come.</h2><p>This little collection is just getting started. Check back for something new.</p></div></div>
    <Link className="text-link" href="/"><ArrowLeft size={16} /> Back to all four chapters</Link>
  </main>;
}

