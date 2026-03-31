import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="border-t border-white/10">
      <div className="container-site py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 md:px-10">
          <p className="eyebrow">La Silla</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Un espacio para artistas, catálogo, prensa y proyección editorial.
          </h2>
          <p className="body-lg mt-5 max-w-2xl">
            Desde aquí podrás articular identidad, difusión, novedades y acceso al
            catálogo del sello en una sola plataforma.
          </p>

          
        </div>
      </div>
    </section>
  );
}