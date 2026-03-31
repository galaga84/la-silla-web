import { ReleasesGrid } from "@/components/releases-grid";

export default function LanzamientosPage() {
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

      <ReleasesGrid />
    </main>
  );
}