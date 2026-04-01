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

  return text ? text.slice(0, 160) + (text.length > 160 ? "..." : "") : "";
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
            className="block"
          >
            {release.cover ? (
              <Image
                alt={release.title}
                src={urlFor(release.cover).width(1200).height(1200).url()}
                width={1200}
                height={1200}
                className="shape-media h-64 w-full object-cover sm:h-80 lg:h-96"
              />
            ) : (
              <div className="shape-media h-64 w-full bg-zinc-200 sm:h-80 lg:h-96" />
            )}

            <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span>{release.format}</span>
              {release.format && release.year ? <span>-</span> : null}
              <span>{release.year}</span>
            </div>

            <h3 className="card-title mt-3 text-lg text-gray-900 sm:text-xl">
              {release.title}
            </h3>

            {release.artist ? (
              <p className="mt-1 text-sm text-zinc-500">{release.artist}</p>
            ) : null}

            <p className="mt-3 max-w-sm text-gray-700">
              {getDescriptionPreview(release.description)}
            </p>
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
