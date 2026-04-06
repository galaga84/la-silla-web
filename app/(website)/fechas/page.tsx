import { ShowsList } from "@/components/shows-list";

const PAGE_SIZE = 6;

type FechasPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function parsePage(page?: string) {
  const value = Number(page);
  return Number.isInteger(value) && value > 0 ? value : 1;
}

export default async function FechasPage({searchParams}: FechasPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(params?.page);

  return (
    <main className="container-site section-space">
      <header className="max-w-3xl">
        <p className="eyebrow">Fechas</p>
        <h1 className="heading-lg mt-4">Agenda y presentaciones</h1>
        <p className="body-lg mt-5">
          Revisa próximas fechas, shows y actividad en vivo de proyectos del sello,
          colaboraciones y presentaciones relacionadas, junto con un archivo reciente.
        </p>
      </header>

      <ShowsList currentPage={currentPage} pageSize={PAGE_SIZE} />
    </main>
  );
}
