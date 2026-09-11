"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
const links = [{ href: "/", label: "Home" }, { href: "/cv", label: "Work" }, { href: "/blog", label: "Writing" }, { href: "/hobbies", label: "Hobbies" }];
export function SiteSidebar() {
  const pathname = usePathname();
  return <header className="site-header">
    <Link href="/" className="wordmark" aria-label="Lucas Bunt home">lb<span>.</span></Link>
    <nav aria-label="Main navigation">{links.map(({href,label}) => <Link key={href} href={href} aria-current={(pathname === href || (href === "/hobbies" && (pathname.startsWith("/hobbies/") || pathname === "/recipes" || pathname === "/travel"))) ? "page" : undefined}>{label}</Link>)}</nav>
    <a className="header-social" href="https://github.com/Bunter">GitHub <ArrowUpRight size={15} /></a>
  </header>;
}

