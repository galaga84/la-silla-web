import Link from "next/link";

const posts = [
  {
    slug: "nuevo-single-artista-uno",
    title: "Artista Uno presenta un nuevo single",
    category: "Lanzamiento",
    date: "28 marzo 2026",
    excerpt:
      "El sello presenta un nuevo adelanto del catálogo, con foco en identidad sonora, proyección y difusión editorial.",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "artista-dos-se-suma-al-catalogo",
    title: "Artista Dos se suma al catálogo del sello",
    category: "Catálogo",
    date: "18 marzo 2026",
    excerpt:
      "La incorporación amplía el mapa estético del sello y abre nuevas posibilidades de circulación, narrativa y programación.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "fechas-confirmadas-otono-2026",
    title: "Se confirman nuevas fechas para otoño 2026",
    category: "Fechas",
    date: "10 marzo 2026",
    excerpt:
      "El sello anuncia nuevas presentaciones en vivo y una agenda que fortalece la visibilidad de sus proyectos.",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "lanzamiento-editorial-del-mes",
    title: "Lanzamiento editorial destacado del mes",
    category: "Editorial",
    date: "02 marzo 2026",
    excerpt:
      "Una mirada al trabajo visual, conceptual y musical detrás de uno de los lanzamientos recientes del catálogo.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "registro-en-vivo-disponible",
    title: "Nuevo registro en vivo ya disponible",
    category: "Video",
    date: "22 febrero 2026",
    excerpt:
      "El sitio suma una nueva pieza audiovisual que amplía la experiencia del catálogo y su circulación digital.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=1160",
  },
  {
    slug: "cobertura-prensa-artista-tres",
    title: "Artista Tres suma cobertura en medios",
    category: "Prensa",
    date: "15 febrero 2026",
    excerpt:
      "Una nueva reseña fortalece el recorrido del proyecto y aporta visibilidad desde un enfoque editorial y crítico.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1160",
  },
];

export function NewsGrid() {
  return (
    <section className="mt-12">
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg"
          >
            <img
              alt={post.title}
              src={post.image}
              className="h-56 w-full object-cover"
            />

            <div className="bg-white p-4 sm:p-6">
              <time className="block text-xs uppercase tracking-[0.18em] text-gray-500">
                {post.date} · {post.category}
              </time>

              <Link href={`/noticias/${post.slug}`}>
                <h3 className="mt-3 text-lg text-gray-900 transition hover:text-[#E8452C] sm:text-xl">
                  {post.title}
                </h3>
              </Link>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}