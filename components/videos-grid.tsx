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

function getYouTubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === "youtube-nocookie.com") {
      const parts = url.pathname.split("/").filter(Boolean);
      const videoId = parts[1];
      return parts[0] === "embed" && videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }
  } catch {
    return null;
  }

  return null;
}

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
        {videos.map((video) => {
          const embedUrl = getYouTubeEmbedUrl(video.videoUrl);

          return (
            <article
              key={video._id}
              className="shape-panel overflow-hidden border border-black/8 bg-white shadow-[0_12px_34px_rgba(17,17,17,0.06)]"
            >
              <div className="relative aspect-video bg-zinc-900">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={video.artist ? `${video.artist} - ${video.title}` : video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : video.thumbnail ? (
                  <Image
                    src={urlFor(video.thumbnail).width(1280).height(720).url()}
                    alt={video.title}
                    fill
                    className="object-cover opacity-70"
                  />
                ) : (
                  <div className="h-full w-full bg-zinc-200" />
                )}
              </div>

              <div className="bg-white p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                  <span>{video.type}</span>
                  {video.type && video.year ? <span>-</span> : null}
                  <span>{video.year}</span>
                </div>

                <h2 className="card-title mt-3 text-lg text-gray-900 sm:text-xl">
                  {video.artist ? `${video.artist} - ${video.title}` : video.title}
                </h2>

                {video.description ? (
                  <p className="mt-3 text-sm leading-6 text-gray-500">{video.description}</p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <PaginationNav
        basePath="/videos"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
