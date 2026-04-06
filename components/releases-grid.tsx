import Image from "next/image";
import Link from "next/link";
import type {PortableTextBlock} from "@portabletext/types";
import {client} from "@/sanity/lib/client";
import {PaginationNav} from "@/components/pagination-nav";
import {urlFor} from "@/sanity/lib/image";
import {paginatedReleasesQuery} from "@/sanity/lib/queries";

type ReleaseCard = {
  _id: string;
  title: string;
  slug: string;
  artist?: string;
  format?: string;
  year?: number;
  cover?: unknown;
  description?: PortableTextBlock[];
};

function getDescriptionPreview(blocks?: PortableTextBlock[]) {
  const text = blocks
    ?.flatMap((block) => ("children" in block && Array.isArray(block.children) ? block.children : []))
    .map((child) => (typeof child === "object" && child && "text" in child ? String(child.text) : ""))
    .join(" ")
    .trim();

  return text ? text.slice(0, 140) + (text.length > 140 ? "..." : "") : "";
}

type PaginatedReleasesResult = {
  items: ReleaseCard[];
  total: number;
};

type ReleasesGridProps = {
  currentPage: number;
  pageSize: number;
};

export async function ReleasesGrid({
  currentPage,
  pageSize,
}: ReleasesGridProps) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const {items: releases, total} = await client.fetch<PaginatedReleasesResult>(
    paginatedReleasesQuery,
    {start, end},
  );
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="mt-12">
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {releases.map((release) => (
          <Link
            key={release._id}
            href={`/lanzamientos/${release.slug}`}
            className="group shape-panel mx-auto block w-full max-w-md overflow-hidden border border-black/8 bg-white shadow-[0_12px_34px_rgba(17,17,17,0.06)] md:max-w-none"
          >
            <div className="relative mb-4 h-56 w-full overflow-hidden bg-zinc-100">
              {release.cover ? (
                <Image
                  alt={release.title}
                  src={urlFor(release.cover).width(1200).height(1200).url()}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="h-full w-full bg-zinc-200" />
              )}
            </div>

            <div className="bg-white p-4 sm:p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-gray-500">
                <span>{release.format}</span>
                {release.format && release.year ? <span>{`  -  `}</span> : null}
                <span>{release.year}</span>
              </div>

              <h3 className="card-title mt-3 text-lg text-gray-900 transition group-hover:text-[#E8452C] sm:text-xl">
                {release.title}
              </h3>

              {release.artist ? (
                <p className="mt-2 text-sm text-gray-500">{release.artist}</p>
              ) : null}

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {getDescriptionPreview(release.description)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <PaginationNav
        basePath="/lanzamientos"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
