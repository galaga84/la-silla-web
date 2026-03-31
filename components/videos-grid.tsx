const videos = [
  {
    title: "Artista Uno — Nuevo single",
    type: "Videoclip",
    year: "2026",
    description:
      "Pieza audiovisual principal del lanzamiento, con una estética sobria y enfoque editorial.",
  },
  {
    title: "Artista Dos — Live session",
    type: "Sesión en vivo",
    year: "2026",
    description:
      "Registro en formato íntimo que amplía la experiencia del proyecto y su propuesta sonora.",
  },
  {
    title: "Artista Tres — Visualizer",
    type: "Visualizer",
    year: "2025",
    description:
      "Contenido audiovisual de apoyo para circulación digital y acompañamiento del release.",
  },
  {
    title: "Artista Cuatro — Registro en vivo",
    type: "En vivo",
    year: "2025",
    description:
      "Registro de presentación que refuerza el trabajo escénico y la presencia del catálogo.",
  },
  {
    title: "Artista Cinco — Pieza editorial",
    type: "Editorial",
    year: "2025",
    description:
      "Contenido visual centrado en relato, atmósfera y extensión conceptual del lanzamiento.",
  },
  {
    title: "Artista Seis — Video oficial",
    type: "Videoclip",
    year: "2024",
    description:
      "Material audiovisual con foco en identidad, circulación y fortalecimiento del proyecto.",
  },
];

export function VideosGrid() {
  return (
    <section className="mt-12">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <article
            key={video.title}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.03]"
          >
            <div className="relative aspect-video bg-zinc-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white">
                  ▶
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span>{video.type}</span>
                <span>•</span>
                <span>{video.year}</span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                {video.title}
              </h2>

              <p className="body-md mt-4">{video.description}</p>

              <div className="mt-6">
                <button className="button-secondary"><span>Ver video</span></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}