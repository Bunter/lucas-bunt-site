import { AdminUnavailable } from "@/components/admin-unavailable";
import Link from "next/link";
import { ArrowRight, FileText, KeyRound } from "lucide-react";

export default function AdminPage() {
  if (process.env.SITES_STATIC_PREVIEW === "1" || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) return <AdminUnavailable />;
  const authConfigured = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-stone-950">
          Lucas home base
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-stone-600">
          This private workspace will manage public site content. The CV slice is first, with
          recipes, travel, and writing following the same pattern.
        </p>
      </div>

      {!authConfigured ? (
        <div className="mb-6 rounded-sm border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <div className="flex gap-3">
            <KeyRound className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Clerk keys are not configured yet, so this local admin preview is visible. Once the
              keys are added, the admin routes should be protected before deployment.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/cv"
          className="group rounded-sm border border-stone-200 bg-white p-5 transition hover:border-emerald-700"
        >
          <div className="flex items-center justify-between">
            <FileText className="h-5 w-5 text-emerald-700" />
            <ArrowRight className="h-4 w-4 text-stone-400 transition group-hover:text-emerald-700" />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-stone-950">Manage CV</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Edit profile basics, photo, experience, education, skills, and projects.
          </p>
        </Link>
      </div>
    </main>
  );
}
