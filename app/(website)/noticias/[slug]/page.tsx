type NewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;

  const postTitle = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <main className="container-site section-space">
      <article className="mx-auto max-w-4xl">
        <p className="eyebrow">Noticias</p>
        <h1 className="heading-lg mt-4">{postTitle}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span>Editorial</span>
          <span>•</span>
          <span>Marzo 2026</span>
        </div>

        <div className="mt-10 aspect-[16/9] rounded-3xl border border-white/10 bg-zinc-900" />

        <div className="body-lg mt-10 space-y-6 text-zinc-300">
          <p>
            Esta página quedará preparada para mostrar el contenido completo de una
            noticia, con imagen principal, fecha, categoría y desarrollo editorial.
          </p>

          <p>
            Aquí podrás publicar anuncios de lanzamientos, incorporación de artistas,
            cobertura de prensa, agenda de presentaciones, videos y otros hitos del sello.
          </p>

          <p>
            Más adelante esto se conectará a Sanity para administrar cada entrada desde
            un CMS y renderizar contenido real de manera dinámica.
          </p>
        </div>
      </article>
    </main>
  );
}