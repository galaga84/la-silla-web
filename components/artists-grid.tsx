import Link from "next/link";

const artists = [
  {
    slug: "artista-uno",
    name: "Artista Uno",
    genre: "Post-punk / Indie",
    description:
      "Proyecto con una identidad sonora oscura, directa y contemporánea, con foco en canciones y atmósfera.",
    image:
      "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "artista-dos",
    name: "Artista Dos",
    genre: "Ambient / Electrónica",
    description:
      "Capas sintéticas, pulso lento y una propuesta visual pensada desde lo editorial y lo sensorial.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "artista-tres",
    name: "Artista Tres",
    genre: "Rock alternativo",
    description:
      "Guitarras densas, melodías tensas y una búsqueda que combina energía, textura y carácter.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "artista-cuatro",
    name: "Artista Cuatro",
    genre: "Dream pop",
    description:
      "Canciones etéreas, arreglos envolventes y una estética delicada pero con personalidad propia.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "artista-cinco",
    name: "Artista Cinco",
    genre: "Experimental",
    description:
      "Exploración sonora, cruces de formato y una aproximación libre al catálogo del sello.",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "artista-seis",
    name: "Artista Seis",
    genre: "Synth / Darkwave",
    description:
      "Pulsos mecánicos, climas nocturnos y una propuesta marcada por identidad, tensión y síntesis.",
    image:
      "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&q=80&w=1160",
  },
];

export function ArtistsGrid() {
  return (
    <section className="mt-12">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {artists.map((artist) => (
          <Link
            key={artist.slug}
            href={`/artistas/${artist.slug}`}
            className="group relative block min-h-[520px] overflow-hidden rounded-3xl bg-black"
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
    </section>
  );
}