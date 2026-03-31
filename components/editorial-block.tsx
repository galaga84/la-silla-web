import Link from "next/link";

export function EditorialBlock() {
  return (
    <section className="border-t border-white/10">
      <div className="container-site section-space grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="card-dark">
          <p className="eyebrow">Noticias</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Novedades, anuncios y movimiento del sello
          </h2>
          <p className="body-lg mt-5 max-w-2xl">
            Publica anuncios de lanzamientos, incorporaciones al catálogo,
            cobertura de shows, colaboraciones y contenido editorial relevante.
          </p>
          <div className="mt-8">
            <Link href="/noticias" className="button-secondary">
              Ir a noticias
            </Link>
          </div>
        </article>

        <article className="card-dark">
          <p className="eyebrow">Prensa</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Materiales listos para difusión
          </h2>
          <p className="body-md mt-5">
            Press kits, imágenes oficiales, dossiers, enlaces y contacto para medios.
          </p>
          <div className="mt-8">
            <Link href="/prensa" className="button-secondary">
              Ir a prensa
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}