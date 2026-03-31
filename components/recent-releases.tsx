import Image from "next/image";
import Link from "next/link";
import type {PortableTextBlock} from "@portabletext/types";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {recentReleasesQuery} from "@/sanity/lib/queries";

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

export async function RecentReleases() {
  const releases = await client.fetch<ReleaseCard[]>(recentReleasesQuery);

  return (
    <section>
      <div className="container-site border-t border-black/10 section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Lanzamientos</p>
            <h2 className="heading-lg mt-3">Recientes y destacados</h2>
          </div>

          <div>
            <Link href="/lanzamientos" className="button-secondary">
              <span>Ver lanzamientos</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {releases.map((release) => (
            <Link key={release._id} href={`/lanzamientos/${release.slug}`} className="block">
              {release.cover ? (
                <Image
                  alt={release.title}
                  src={urlFor(release.cover).width(1200).height(1200).url()}
                  width={1200}
                  height={1200}
                  className="h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-96"
                />
              ) : (
                <div className="h-64 w-full rounded-2xl bg-zinc-200 sm:h-80 lg:h-96" />
              )}

              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span>{release.format}</span>
                {release.format && release.year ? <span>-</span> : null}
                <span>{release.year}</span>
              </div>

              <h3 className="mt-3 text-lg font-bold text-gray-900 sm:text-xl">
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
      </div>
    </section>
  );
}
