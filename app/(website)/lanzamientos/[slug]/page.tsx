import Image from "next/image";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import type {PortableTextBlock} from "@portabletext/types";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {releaseBySlugQuery} from "@/sanity/lib/queries";

type ReleasePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ReleaseArtist = {
  _id: string;
  name: string;
  slug: string;
  genre?: string;
  image?: unknown;
};

type Release = {
  title: string;
  format?: string;
  year?: number;
  cover?: unknown;
  description?: PortableTextBlock[];
  artist?: ReleaseArtist;
};

export default async function ReleaseDetailPage({params}: ReleasePageProps) {
  const {slug} = await params;
  const release = await client.fetch<Release | null>(releaseBySlugQuery, {slug});

  if (!release) {
    notFound();
  }

  return (
    <main className="container-site section-space">
      <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
          {release.cover ? (
            <Image
              src={urlFor(release.cover).width(1200).height(1200).url()}
              alt={release.title}
              fill
              className="object-cover"
            />
          ) : null}
        </div>

        <section className="max-w-3xl">
          <p className="eyebrow">Lanzamiento</p>
          <h1 className="heading-lg mt-4">{release.title}</h1>

          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-zinc-500">
            {[release.format, release.year, release.artist?.name].filter(Boolean).join(" - ")}
          </p>

          {release.description?.length ? (
            <div className="body-lg mt-6 space-y-6 text-zinc-700">
              <PortableText value={release.description} />
            </div>
          ) : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="card-dark">
              <h2 className="text-lg font-semibold">Ficha</h2>
              <p className="body-md mt-3">
                {[release.format, release.year].filter(Boolean).join(" - ") || "Sin ficha complementaria todavia."}
              </p>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Artista</h2>
              {release.artist ? (
                <div className="mt-3 space-y-3">
                  <p className="body-md">{release.artist.name}</p>
                  <Link href={`/artistas/${release.artist.slug}`} className="text-sm text-[#E8452C] transition hover:text-black">
                    Ver perfil del artista
                  </Link>
                </div>
              ) : (
                <p className="body-md mt-3">Sin artista asociado.</p>
              )}
            </div>
          </div>

          <div className="mt-10">
            <Link href="/lanzamientos" className="button-secondary inline-flex">
              <span>Volver a lanzamientos</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
