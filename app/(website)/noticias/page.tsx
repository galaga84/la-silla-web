import { NewsGrid } from "@/components/news-grid";

export default function NoticiasPage() {
  return (
    <main className="container-site section-space">
      <header className="max-w-3xl">
        <p className="eyebrow">Noticias</p>
        <h1 className="heading-lg mt-4">Novedades del sello y del catálogo</h1>
        <p className="body-lg mt-5">
          Un espacio para anuncios, lanzamientos, incorporaciones, cobertura,
          agenda y contenidos editoriales vinculados al sello.
        </p>
      </header>

      <NewsGrid />
    </main>
  );
}