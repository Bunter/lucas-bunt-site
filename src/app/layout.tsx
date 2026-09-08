import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import { SiteSidebar } from "@/components/site-sidebar";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Lucas Bunt — Work, life & the interesting bits between", template: "%s — Lucas Bunt" },
  description: "A personal home for Lucas Bunt's work, writing, recipes, and travel.",
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className="h-full antialiased"><body className="min-h-full"><AuthProvider>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="site-shell"><SiteSidebar /><div>{children}</div>
    <footer className="site-footer"><span>Lucas Bunt © {new Date().getFullYear()}</span><div><a href="https://www.linkedin.com/in/lucasbunt/">LinkedIn ↗</a><a href="https://github.com/Bunter">GitHub ↗</a><a href="/admin">Admin</a></div></footer></div>
  </AuthProvider></body></html>;
}

