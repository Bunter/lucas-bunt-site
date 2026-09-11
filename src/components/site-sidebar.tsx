"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
const links = [{ href: "/", label: "Home" }, { href: "/cv", label: "Work" }, { href: "/blog", label: "Writing" }, { href: "/hobbies", label: "Hobbies" }];
export function SiteSidebar() {
  const pathname = usePathname();
  return <header className="site-header">
    <a href="/" className="wordmark" aria-label="Lucas Bunt home">lb<span>.</span></a>
    <nav aria-label="Main navigation">{links.map(({href,label}) => <a key={href} href={href} aria-current={(pathname === href || (href === "/hobbies" && (pathname.startsWith("/hobbies/") || pathname === "/recipes" || pathname === "/travel"))) ? "page" : undefined}>{label}</a>)}</nav>
    <a className="header-social" href="https://github.com/Bunter">GitHub <ArrowUpRight size={15} /></a>
  </header>;
}

