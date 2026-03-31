type ReleasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReleaseDetailPage({ params }: ReleasePageProps) {
  const { slug } = await params;

  const releaseTitle = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <main className="container-site section-space">
      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <div className="aspect-square rounded-3xl border border-white/10 bg-zinc-900" />

        <section className="max-w-3xl">
          <p className="eyebrow">Lanzamiento</p>
          <h1 className="heading-lg mt-4">{releaseTitle}</h1>

          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-zinc-500">
            Single • 2026 • Artista asociado
          </p>

          <p className="body-lg mt-6">
            Esta página quedará lista para mostrar portada, descripción, artista,
            créditos, enlaces a plataformas, tracklist y material relacionado.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="card-dark">
              <h2 className="text-lg font-semibold">Ficha</h2>
              <p className="body-md mt-3">
                Aquí irán formato, fecha, artista y datos editoriales del release.
              </p>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Plataformas</h2>
              <p className="body-md mt-3">
                Aquí irán Spotify, Apple Music, Bandcamp, YouTube y otros enlaces.
              </p>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Tracklist</h2>
              <p className="body-md mt-3">
                Aquí se listarán canciones o piezas incluidas en el lanzamiento.
              </p>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Créditos</h2>
              <p className="body-md mt-3">
                Aquí irán producción, mezcla, masterización, arte y colaboración.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}