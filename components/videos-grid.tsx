import Image from "next/image";
import {client} from "@/sanity/lib/client";
import {PaginationNav} from "@/components/pagination-nav";
import {urlFor} from "@/sanity/lib/image";
import {paginatedVideosQuery} from "@/sanity/lib/queries";

type VideoItem = {
  _id: string;
  title: string;
  artist?: string;
  type?: string;
  year?: number;
  thumbnail?: unknown;
  videoUrl: string;
  description?: string;
};

type PaginatedVideosResult = {
  items: VideoItem[];
  total: number;
};

type VideosGridProps = {
  currentPage: number;
  pageSize: number;
};

export async function VideosGrid({currentPage, pageSize}: VideosGridProps) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const {items: videos, total} = await client.fetch<PaginatedVideosResult>(
    paginatedVideosQuery,
    {start, end},
  );
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="mt-12">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {videos.map((video) => (
          <article
            key={video._id}
            className="group shape-panel overflow-hidden border border-black/10 bg-zinc-50 transition hover:border-black/20 hover:bg-zinc-100/80"
          >
            <div className="relative aspect-video bg-zinc-900">
              {video.thumbnail ? (
                <Image
                  src={urlFor(video.thumbnail).width(1280).height(720).url()}
                  alt={video.title}
                  fill
                  className="object-cover opacity-70"
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black">
                  ?
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span>{video.type}</span>
                {video.type && video.year ? <span>-</span> : null}
                <span>{video.year}</span>
              </div>

              <h2 className="card-title mt-4 text-2xl text-black">
                {video.artist ? `${video.artist} - ${video.title}` : video.title}
              </h2>

              {video.description ? <p className="body-md mt-4">{video.description}</p> : null}

              <div className="mt-6">
                <a href={video.videoUrl} target="_blank" rel="noreferrer" className="button-secondary">
                  <span>Ver video</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <PaginationNav
        basePath="/videos"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
