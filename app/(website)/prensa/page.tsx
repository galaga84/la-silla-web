import { PressResources } from "@/components/press-resources";

export default function PrensaPage() {
  return (
    <main className="container-site section-space">
      <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="max-w-3xl">
          <p className="eyebrow">Prensa</p>
          <h1 className="heading-lg mt-4">
            Recursos editoriales y materiales de difusión
          </h1>
          <p className="body-lg mt-5">
            Accede a press kits, imágenes oficiales, logos, dossiers y materiales
            preparados para medios, festivales, partners y difusión general.
          </p>
        </div>

        <aside className="card-dark">
          <p className="text-sm font-semibold text-black">Contacto de prensa</p>
          <p className="body-md mt-4">
            Para entrevistas, cobertura, colaboraciones, acreditaciones o solicitud
            de material adicional, este bloque quedará listo para mostrar el contacto oficial.
          </p>

          <div className="mt-6 space-y-2 text-sm text-zinc-600">
            <p>press@lasilla.cl</p>
            <p>+56 9 1234 5678</p>
          </div>
        </aside>
      </header>

      <PressResources />

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <article className="card-dark">
          <h2 className="text-xl font-semibold text-black">Cobertura</h2>
          <p className="body-md mt-3">
            Espacio para destacar entrevistas, reseñas, menciones y apariciones en medios.
          </p>
        </article>

        <article className="card-dark">
          <h2 className="text-xl font-semibold text-black">Descargas</h2>
          <p className="body-md mt-3">
            Aquí se podrán centralizar archivos públicos y materiales específicos por artista o release.
          </p>
        </article>

        <article className="card-dark">
          <h2 className="text-xl font-semibold text-black">Solicitudes</h2>
          <p className="body-md mt-3">
            Base para sumar más adelante formularios o accesos diferenciados según tipo de requerimiento.
          </p>
        </article>
      </section>
    </main>
  );
}