import Image from "next/image";
import Link from "next/link";
import type {PortableTextBlock} from "@portabletext/types";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {featuredArtistsQuery} from "@/sanity/lib/queries";

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

  return text ? text.slice(0, 140) + (text.length > 140 ? "..." : "") : "";
}

export async function FeaturedArtists() {
  const artists = await client.fetch<ArtistCard[]>(featuredArtistsQuery);

  return (
    <section>
      <div className="container-site border-t border-black/10 section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Catálogo</p>
            <h2 className="heading-lg mt-3">Proyectos del sello</h2>
          </div>

          <div>
            <Link href="/artistas" className="button-secondary">
              <span>Ver catálogo</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {artists.map((artist) => (
            <Link
              key={artist._id}
              href={`/artistas/${artist.slug}`}
              className="group shape-panel relative block min-h-[460px] overflow-hidden bg-black"
            >
              {artist.image ? (
                <Image
                  alt={artist.name}
                  src={urlFor(artist.image).width(1200).height(1600).url()}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-50"
                />
              ) : null}

              <div className="relative flex h-full flex-col p-5 sm:p-6 lg:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#E8452C]">
                  {artist.genre}
                </p>

                <p className="card-title-light mt-2 text-2xl sm:text-3xl">
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
      </div>
    </section>
  );
}
