import Link from "next/link";

const releases = [
  {
    title: "Lanzamiento Uno",
    artist: "Artista Uno",
    format: "Single",
    year: "2026",
    description:
      "Un corte directo, melódico y oscuro, con una producción limpia y un foco claro en la identidad del proyecto.",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=1160",
    href: "/lanzamientos/lanzamiento-uno",
  },
  {
    title: "Lanzamiento Dos",
    artist: "Artista Dos",
    format: "EP",
    year: "2026",
    description:
      "Un trabajo breve pero cohesionado, centrado en atmósferas electrónicas y una escucha inmersiva.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1160",
    href: "/lanzamientos/lanzamiento-dos",
  },
  {
    title: "Lanzamiento Tres",
    artist: "Artista Tres",
    format: "Álbum",
    year: "2025",
    description:
      "Un disco de canciones intensas, guitarras densas y una búsqueda sonora de mayor amplitud.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1160",
    href: "/lanzamientos/lanzamiento-tres",
  },
  {
    title: "Lanzamiento Cuatro",
    artist: "Artista Cuatro",
    format: "Single",
    year: "2025",
    description:
      "Una pieza más delicada y envolvente, construida desde capas, melodía y textura.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1160",
    href: "/lanzamientos/lanzamiento-cuatro",
  },
];

export function RecentReleases() {
  return (
    <section>
  <div className="container-site border-t border-black/10 section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Lanzamientos</p>
            <h2 className="heading-lg mt-3">Recientes y destacados</h2>
          </div>

          <div>
            <Link href="/lanzamientos" className="button-secondary">
              <span>Ver lanzamientos</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {releases.map((release) => (
            <Link key={release.title} href={release.href} className="block">
              <img
                alt={release.title}
                src={release.image}
                className="h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-96"
              />

              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span>{release.format}</span>
                <span>•</span>
                <span>{release.year}</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">
                {release.title}
              </h3>

              <p className="mt-1 text-sm text-zinc-500">{release.artist}</p>

              <p className="mt-3 max-w-sm text-gray-700">
                {release.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}