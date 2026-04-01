const pressItems = [
  {
    title: "Press kit del sello",
    description:
      "Documento base con presentación, enfoque editorial, catálogo y lineamientos generales del sello.",
    type: "PDF",
  },
  {
    title: "Fotos promocionales",
    description:
      "Selección de imágenes oficiales del sello y de artistas en formatos listos para difusión.",
    type: "ZIP",
  },
  {
    title: "Logos y assets",
    description:
      "Versiones del logo, variantes de uso y materiales gráficos para prensa y partners.",
    type: "ZIP",
  },
  {
    title: "Dossiers de lanzamientos",
    description:
      "Material editorial por lanzamiento con contexto, ficha, créditos y enlaces relevantes.",
    type: "PDF",
  },
];

export function PressResources() {
  return (
    <section className="mt-12">
      <div className="grid gap-6 lg:grid-cols-2">
        {pressItems.map((item) => (
          <article
            key={item.title}
            className="shape-panel border border-black/10 bg-zinc-50 p-6 transition hover:border-black/20 hover:bg-zinc-100/80"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-black">
                {item.title}
              </h2>
              <span className="shape-tag border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                {item.type}
              </span>
            </div>

            <p className="body-md mt-4">{item.description}</p>

            <div className="mt-6">
              <button className="button-secondary"><span>Próximamente</span></button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
