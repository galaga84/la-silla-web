import { ArtistsGrid } from "@/components/artists-grid";

const PAGE_SIZE = 6;

type ArtistasPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function parsePage(page?: string) {
  const value = Number(page);
  return Number.isInteger(value) && value > 0 ? value : 1;
}

export default async function ArtistasPage({searchParams}: ArtistasPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(params?.page);

  return (
    <main className="container-site section-space">
      <header className="max-w-3xl">
        <p className="eyebrow">Artistas</p>
        <h1 className="heading-lg mt-4">Catálogo y proyectos del sello</h1>
        <p className="body-lg mt-5">
          Conoce a las y los artistas que forman parte del catálogo, su identidad,
          propuesta sonora y trayectoria dentro del sello.
        </p>
      </header>

      <ArtistsGrid currentPage={currentPage} pageSize={PAGE_SIZE} />
    </main>
  );
}
