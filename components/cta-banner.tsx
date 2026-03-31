export function CtaBanner() {
  return (
    <section className="border-t border-black/10 bg-white">
      <div className="container-site py-20">
        <div className="rounded-3xl border border-black/8 bg-white px-6 py-12 shadow-[0_18px_48px_rgba(17,17,17,0.08)] md:px-10">
          <p className="eyebrow">La Silla</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Un espacio para artistas, catalogo, prensa y proyeccion editorial.
          </h2>
          <p className="body-lg mt-5 max-w-2xl">
            Desde aqui podras articular identidad, difusion, novedades y acceso al
            catalogo del sello en una sola plataforma.
          </p>
        </div>
      </div>
    </section>
  );
}
