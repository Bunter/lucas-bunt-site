import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import { SiteSidebar } from "@/components/site-sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucas Bunt",
  description: "Personal portfolio, CV, recipes, travel, and writing from Lucas Bunt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <AuthProvider>
          <div className="flex min-h-screen">
            <SiteSidebar />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
