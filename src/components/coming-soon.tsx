export function ComingSoon({
  icon: Icon,
  eyebrow,
  title,
  body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <main className="bg-white">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 py-16">
        <Icon className="h-8 w-8 text-emerald-700" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-stone-950 md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-stone-600">{body}</p>
      </section>
    </main>
  );
}
