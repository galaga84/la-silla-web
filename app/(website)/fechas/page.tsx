import { ShowsList } from "@/components/shows-list";

export default function FechasPage() {
  return (
    <main className="container-site section-space">
      <header className="max-w-3xl">
        <p className="eyebrow">Fechas</p>
        <h1 className="heading-lg mt-4">Agenda y presentaciones del sello</h1>
        <p className="body-lg mt-5">
          Revisa próximas fechas, shows y actividad en vivo de los proyectos del sello,
          junto con un archivo reciente de presentaciones.
        </p>
      </header>

      <ShowsList />
    </main>
  );
}