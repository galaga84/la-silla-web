import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#cfa9d0] text-[#1f1630]">
      <div className="container-site flex min-h-10 items-center justify-center py-2 text-center text-sm font-semibold">
        <p>
          Nuevo lanzamiento disponible ahora.{" "}
          <Link
            href="/lanzamientos"
            className="underline decoration-[#1f1630] underline-offset-4 transition hover:opacity-80"
          >
            Ver catalogo
          </Link>
        </p>
      </div>
    </div>
  );
}
