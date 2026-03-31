import Image from "next/image";
import Link from "next/link";
import type {PortableTextBlock} from "@portabletext/types";
import {client} from "@/sanity/lib/client";
import {PaginationNav} from "@/components/pagination-nav";
import {urlFor} from "@/sanity/lib/image";
import {paginatedArtistsQuery} from "@/sanity/lib/queries";

type ArtistCard = {
  _id: string;
  name: string;
  slug: string;
  genre?: string;
  image?: unknown;
  bio?: PortableTextBlock[];
};

function getBioPreview(blocks?: PortableTextBlock[]) {
  const text = blocks
    ?.flatMap((block) => ("children" in block && Array.isArray(block.children) ? block.children : []))
    .map((child) => (typeof child === "object" && child && "text" in child ? String(child.text) : ""))
    .join(" ")
    .trim();

  return text ? text.slice(0, 180) + (text.length > 180 ? "..." : "") : "";
}

type PaginatedArtistsResult = {
  items: ArtistCard[];
  total: number;
};

type ArtistsGridProps = {
  currentPage: number;
  pageSize: number;
};

export async function ArtistsGrid({currentPage, pageSize}: ArtistsGridProps) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const {items: artists, total} = await client.fetch<PaginatedArtistsResult>(
    paginatedArtistsQuery,
    {start, end},
  );
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="mt-12">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {artists.map((artist) => (
          <Link
            key={artist._id}
            href={`/artistas/${artist.slug}`}
            className="group relative block min-h-[520px] overflow-hidden rounded-3xl bg-black"
          >
            {artist.image ? (
              <Image
                alt={artist.name}
                src={urlFor(artist.image).width(1200).height(1600).url()}
                fill
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-50"
              />
            ) : null}

            <div className="relative flex h-full flex-col p-5 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#E8452C]">
                {artist.genre}
              </p>

              <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {artist.name}
              </p>

              <div className="mt-auto pt-24">
                <div className="translate-y-8 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm leading-6 text-white/90">
                    {getBioPreview(artist.bio)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <PaginationNav
        basePath="/artistas"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
