import { VideosGrid } from "@/components/videos-grid";

export default function VideosPage() {
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

      <VideosGrid />
    </main>
  );
}