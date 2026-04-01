import { VideosGrid } from "@/components/videos-grid";

const PAGE_SIZE = 6;

type VideosPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function parsePage(page?: string) {
  const value = Number(page);
  return Number.isInteger(value) && value > 0 ? value : 1;
}

export default async function VideosPage({searchParams}: VideosPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(params?.page);

  return (
    <main className="container-site section-space">
      <header className="max-w-3xl">
        <p className="eyebrow">Videos</p>
        <h1 className="heading-lg mt-4">Videoclips, sesiones y registros audiovisuales</h1>
        <p className="body-lg mt-5">
          Un espacio para reunir videoclips, sesiones en vivo, visualizers y piezas
          editoriales vinculadas al catálogo del sello.
        </p>
      </header>

      <VideosGrid currentPage={currentPage} pageSize={PAGE_SIZE} />
    </main>
  );
}
