import { NewsGrid } from "@/components/news-grid";

const PAGE_SIZE = 6;

type NoticiasPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function parsePage(page?: string) {
  const value = Number(page);
  return Number.isInteger(value) && value > 0 ? value : 1;
}

export default async function NoticiasPage({searchParams}: NoticiasPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const currentPage = parsePage(params?.page);

  return (
    <main className="container-site section-space">
      <header className="max-w-3xl">
        <p className="eyebrow">Noticias</p>
        <h1 className="heading-lg mt-4">Novedades del sello y del catálogo</h1>
        <p className="body-lg mt-5">
          Un espacio para anuncios, lanzamientos, incorporaciones, cobertura,
          prensa, agenda y contenidos editoriales vinculados al sello.
        </p>
      </header>

      <NewsGrid currentPage={currentPage} pageSize={PAGE_SIZE} />
    </main>
  );
}
