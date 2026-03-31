const upcomingShows = [
  {
    date: "12 abril 2026",
    city: "Santiago",
    venue: "Sala Metrónomo",
    artist: "Artista Uno",
    note: "Entradas disponibles",
  },
  {
    date: "20 abril 2026",
    city: "Valparaíso",
    venue: "El Huevo",
    artist: "Artista Tres",
    note: "Últimos tickets",
  },
  {
    date: "03 mayo 2026",
    city: "Concepción",
    venue: "Teatro Biobío",
    artist: "Artista Dos",
    note: "Próximamente",
  },
  {
    date: "17 mayo 2026",
    city: "Santiago",
    venue: "Club Subterráneo",
    artist: "Artista Seis",
    note: "Entradas disponibles",
  },
];

const pastShows = [
  {
    date: "08 febrero 2026",
    city: "Santiago",
    venue: "Sala RBX",
    artist: "Artista Cuatro",
  },
  {
    date: "25 enero 2026",
    city: "Valdivia",
    venue: "Festival Local",
    artist: "Artista Dos",
  },
  {
    date: "14 diciembre 2025",
    city: "Viña del Mar",
    venue: "Trotamundos Terraza",
    artist: "Artista Uno",
  },
];

export function ShowsList() {
  return (
    <section className="mt-12 space-y-12">
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Agenda</p>
            <h2 className="heading-lg mt-3">Próximas presentaciones</h2>
          </div>
        </div>

        <div className="mt-8 divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
          {upcomingShows.map((show) => (
            <article
              key={`${show.date}-${show.artist}-${show.venue}`}
              className="grid gap-4 px-6 py-6 md:grid-cols-[170px_1fr_auto] md:items-center"
            >
              <div className="text-sm uppercase tracking-[0.16em] text-zinc-500">
                {show.date}
              </div>

              <div>
                <h3 className="text-xl font-semibold tracking-tight">{show.artist}</h3>
                <p className="mt-1 text-sm text-zinc-300">
                  {show.city} · {show.venue}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-zinc-400 sm:inline">
                  {show.note}
                </span>
                <button className="button-secondary"><span>Más info</span></button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div>
        <div>
          <p className="eyebrow">Archivo</p>
          <h2 className="heading-lg mt-3">Fechas recientes</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {pastShows.map((show) => (
            <article key={`${show.date}-${show.artist}`} className="card-dark">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {show.date}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{show.artist}</h3>
              <p className="body-md mt-3">
                {show.city} · {show.venue}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}