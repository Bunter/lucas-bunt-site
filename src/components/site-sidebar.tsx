"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, LockKeyhole, Map, NotebookText, Utensils } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cv", label: "CV", icon: FileText },
  { href: "/recipes", label: "Recipes", icon: Utensils },
  { href: "/travel", label: "Travel", icon: Map },
  { href: "/blog", label: "Writing", icon: NotebookText },
  { href: "/admin", label: "Admin", icon: LockKeyhole },
];

export function SiteSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col border-r border-stone-200 bg-white md:w-64">
      <Link
        href="/"
        className="flex h-20 items-center justify-center border-b border-stone-200 px-4 md:justify-start md:px-6"
        aria-label="Lucas Bunt home"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-stone-950 text-sm font-semibold text-white">
          LB
        </span>
        <span className="ml-3 hidden text-base font-semibold tracking-normal text-stone-950 md:inline">
          Lucas Bunt
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-5 md:px-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex h-11 items-center justify-center gap-3 rounded-sm px-3 text-sm font-medium transition md:justify-start",
                isActive
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-950",
              ].join(" ")}
              aria-label={label}
              title={label}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
