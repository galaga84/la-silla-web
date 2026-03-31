import Image from "next/image";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import type {PortableTextBlock} from "@portabletext/types";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {artistBySlugQuery} from "@/sanity/lib/queries";

type ArtistPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ArtistRelease = {
  _id: string;
  title: string;
  slug: string;
  format?: string;
  year?: number;
  cover?: unknown;
};

type ArtistShow = {
  _id: string;
  title: string;
  date: string;
  city?: string;
  venue?: string;
  ticketUrl?: string;
  status?: string;
};

type ArtistVideo = {
  _id: string;
  title: string;
  type?: string;
  year?: number;
  thumbnail?: unknown;
  videoUrl: string;
  description?: string;
};

type Artist = {
  name: string;
  genre?: string;
  image?: unknown;
  bio?: PortableTextBlock[];
  releases?: ArtistRelease[];
  shows?: ArtistShow[];
  videos?: ArtistVideo[];
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export default async function ArtistDetailPage({params}: ArtistPageProps) {
  const {slug} = await params;
  const artist = await client.fetch<Artist | null>(artistBySlugQuery, {slug});

  if (!artist) {
    notFound();
  }

  return (
    <main className="container-site section-space">
      <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
          {artist.image ? (
            <Image
              src={urlFor(artist.image).width(1200).height(1500).url()}
              alt={artist.name}
              fill
              className="object-cover"
            />
          ) : null}
        </div>

        <section className="max-w-3xl">
          <p className="eyebrow">Artista</p>
          <h1 className="heading-lg mt-4">{artist.name}</h1>
          {artist.genre ? <p className="mt-3 text-sm uppercase tracking-[0.22em] text-zinc-500">{artist.genre}</p> : null}

          {artist.bio?.length ? (
            <div className="body-lg mt-6 space-y-6 text-zinc-700">
              <PortableText value={artist.bio} />
            </div>
          ) : null}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="card-dark">
              <h2 className="text-lg font-semibold">Lanzamientos</h2>
              <div className="mt-3 space-y-3">
                {artist.releases?.length ? artist.releases.map((release) => (
                  <Link key={release._id} href={`/lanzamientos/${release.slug}`} className="block text-sm text-zinc-700 transition hover:text-[#E8452C]">
                    {release.title}{release.format || release.year ? ` - ${[release.format, release.year].filter(Boolean).join(" - ")}` : ""}
                  </Link>
                )) : <p className="body-md">Sin lanzamientos asociados todavia.</p>}
              </div>
            </div>

            <div className="card-dark">
              <h2 className="text-lg font-semibold">Proximas fechas</h2>
              <div className="mt-3 space-y-3">
                {artist.shows?.length ? artist.shows.map((show) => (
                  <div key={show._id} className="text-sm text-zinc-700">
                    <p>{formatDate(show.date)}</p>
                    <p>{[show.city, show.venue].filter(Boolean).join(" - ")}</p>
                  </div>
                )) : <p className="body-md">Sin fechas registradas por ahora.</p>}
              </div>
            </div>

            <div className="card-dark sm:col-span-2">
              <h2 className="text-lg font-semibold">Videos</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {artist.videos?.length ? artist.videos.map((video) => (
                  <a key={video._id} href={video.videoUrl} target="_blank" rel="noreferrer" className="text-sm text-zinc-700 transition hover:text-[#E8452C]">
                    {video.title}{video.type || video.year ? ` - ${[video.type, video.year].filter(Boolean).join(" - ")}` : ""}
                  </a>
                )) : <p className="body-md">Sin videos asociados por ahora.</p>}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/artistas" className="button-secondary inline-flex">
              <span>Volver a artistas</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
