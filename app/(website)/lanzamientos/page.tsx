import { ReleasesGrid } from "@/components/releases-grid";

const PAGE_SIZE = 6;

type LanzamientosPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function parsePage(page?: string) {
  const value = Number(page);
  return Number.isInteger(value) && value > 0 ? value : 1;
}

export default async function LanzamientosPage({
  searchParams,
}: LanzamientosPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(params?.page);

  return (
    <main className="container-site section-space">
      <header className="max-w-3xl">
        <p className="eyebrow">Lanzamientos</p>
        <h1 className="heading-lg mt-4">Catálogo editorial y musical</h1>
        <p className="body-lg mt-5">
          Explora singles, EPs, álbumes y publicaciones recientes del sello,
          con foco en identidad, contexto y proyección del catálogo.
        </p>
      </header>

      <ReleasesGrid currentPage={currentPage} pageSize={PAGE_SIZE} />
    </main>
  );
}
