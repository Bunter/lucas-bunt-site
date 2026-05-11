export default function Home() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid min-h-screen max-w-6xl content-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Personal portfolio
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-normal text-stone-950 md:text-7xl">
              Lucas Bunt
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-stone-700">
              A public home for professional work, writing, recipes, and travel, backed by a
              private admin workspace for keeping it all current.
            </p>
          </div>

          <div className="grid content-end gap-4">
            <Status title="CV and work history" state="First vertical slice" />
            <Status title="Recipes" state="Planned" />
            <Status title="Travel tracker" state="Planned" />
            <Status title="Work and tech writing" state="Planned" />
          </div>
        </div>
      </section>
    </main>
  );
}

function Status({
  title,
  state,
}: {
  title: string;
  state: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-stone-200 bg-stone-50 px-4 py-4">
      <span className="text-sm font-semibold text-stone-800">{title}</span>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">{state}</span>
    </div>
  );
}
