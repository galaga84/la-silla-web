import { ArtistsGrid } from "@/components/artists-grid";

export default function ArtistasPage() {
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

      <ArtistsGrid />
    </main>
  );
}