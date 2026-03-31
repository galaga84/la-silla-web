import Link from "next/link";

const shows = [
  {
    date: "12 Abr 2026",
    city: "Santiago",
    venue: "Sala Metrónomo",
    artist: "Artista Uno",
  },
  {
    date: "20 Abr 2026",
    city: "Valparaíso",
    venue: "El Huevo",
    artist: "Artista Tres",
  },
  {
    date: "03 May 2026",
    city: "Concepción",
    venue: "Teatro Biobío",
    artist: "Artista Dos",
  },
];

export function UpcomingShows() {
  return (
    <section>
  <div className="container-site border-t border-black/10 section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Fechas</p>
            <h2 className="heading-lg mt-3">Próximas presentaciones</h2>
          </div>

          <div>
            <Link href="/fechas" className="button-secondary">
              <span>Ver agenda</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 divide-y divide-black/10 rounded-2xl border border-black/10 bg-zinc-50">
          {shows.map((show) => (
            <article
              key={`${show.date}-${show.artist}`}
              className="grid gap-4 px-6 py-6 md:grid-cols-[180px_1fr] md:items-center"
            >
              <div className="text-sm text-zinc-500">{show.date}</div>

              <div>
                <h3 className="text-xl font-semibold text-black">{show.artist}</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  {show.city} · {show.venue}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}