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
  const featuredReleases = releases.slice(0, 3);

  return (
    <section className="border-t border-black/10 bg-white">
      <div className="container-site section-space">
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

        <div className="mx-auto mt-10 grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredReleases.map((release) => (
            <Link
              key={release._id}
              href={`/lanzamientos/${release.slug}`}
              className="group mx-auto block w-full max-w-md overflow-hidden rounded-[1.75rem] border border-black/8 bg-white shadow-[0_12px_34px_rgba(17,17,17,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_48px_rgba(17,17,17,0.1)] md:max-w-none"
            >
              <div className="relative h-56 w-full bg-zinc-100">
                {release.cover ? (
                  <Image
                    alt={release.title}
                    src={urlFor(release.cover).width(1200).height(1200).url()}
                    fill
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

                <h3 className="mt-3 text-lg text-gray-900 transition group-hover:text-[#E8452C] sm:text-xl">
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
      </div>
    </section>
  );
}
