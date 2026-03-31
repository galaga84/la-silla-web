type ArtistPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtistDetailPage({ params }: ArtistPageProps) {
  const { slug } = await params;

  const artistName = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <main className="container-site section-space">
      <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
        <div className="aspect-[4/5] rounded-3xl border border-white/10 bg-zinc-900" />

        <section className="max-w-3xl">
          <p className="eyebrow">Artista</p>
          <h1 className="heading-lg mt-4">{artistName}</h1>

          <p className="body-lg mt-6">
            Esta página quedará preparada para mostrar biografía, discografía,
            enlaces, videos relacionados, próximas fechas y material editorial del proyecto.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="card-dark">
              <h2 className="text-lg font-semibold">Biografía</h2>
              <p className="body-md mt-3">
                Aquí irá la reseña principal del artista.
              </p>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Lanzamientos</h2>
              <p className="body-md mt-3">
                Aquí se listarán discos, singles y EPs asociados.
              </p>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Próximas fechas</h2>
              <p className="body-md mt-3">
                Aquí aparecerán eventos y presentaciones en vivo.
              </p>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Enlaces</h2>
              <p className="body-md mt-3">
                Aquí irán Spotify, YouTube, Bandcamp, Instagram y más.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}