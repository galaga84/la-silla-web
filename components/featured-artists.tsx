import Link from "next/link";

const artists = [
  {
    name: "Artista Uno",
    genre: "Post-punk / Indie",
    description:
      "Proyecto con una identidad sonora oscura, melódica y contemporánea.",
    image:
      "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?auto=format&fit=crop&q=80&w=1160",
    href: "/artistas/artista-uno",
  },
  {
    name: "Artista Dos",
    genre: "Ambient / Electrónica",
    description:
      "Texturas electrónicas, capas atmosféricas y una propuesta visual cuidada.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1160",
    href: "/artistas/artista-dos",
  },
  {
    name: "Artista Tres",
    genre: "Rock alternativo",
    description:
      "Canciones directas, guitarras densas y una estética editorial sólida.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1160",
    href: "/artistas/artista-tres",
  },
];

export function FeaturedArtists() {
  return (
    <section>
  <div className="container-site border-t border-black/10 section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 className="heading-lg mt-3">Proyectos del sello</h2>
          </div>

          <div>
            <Link href="/artistas" className="button-secondary">
              <span>Ver catálogo</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {artists.map((artist) => (
            <Link
              key={artist.name}
              href={artist.href}
              className="group relative block min-h-[460px] overflow-hidden rounded-3xl bg-black"
            >
              <img
                alt={artist.name}
                src={artist.image}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-50"
              />

              <div className="relative flex h-full flex-col p-5 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#E8452C]">
                  {artist.genre}
                </p>

                <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {artist.name}
                </p>

                <div className="mt-auto pt-24">
                  <div className="translate-y-8 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm leading-6 text-white/90">
                      {artist.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}