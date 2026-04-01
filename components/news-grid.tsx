import Image from "next/image";
import Link from "next/link";
import {client} from "@/sanity/lib/client";
import {PaginationNav} from "@/components/pagination-nav";
import {urlFor} from "@/sanity/lib/image";
import {paginatedNewsQuery} from "@/sanity/lib/queries";

type NewsGridItem = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
  mainImage?: unknown;
};

function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

type PaginatedNewsResult = {
  items: NewsGridItem[];
  total: number;
};

type NewsGridProps = {
  currentPage: number;
  pageSize: number;
};

export async function NewsGrid({currentPage, pageSize}: NewsGridProps) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const {items: posts, total} = await client.fetch<PaginatedNewsResult>(
    paginatedNewsQuery,
    {start, end},
  );
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section className="mt-12">
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post._id}
            className="shape-frame overflow-hidden shadow-sm transition hover:shadow-lg"
          >
            <div className="relative h-56 w-full bg-zinc-100">
              {post.mainImage ? (
                <Image
                  src={urlFor(post.mainImage).width(1200).height(700).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="bg-white p-4 sm:p-6">
              <time className="block text-xs uppercase tracking-[0.18em] text-gray-500">
                {formatDate(post.publishedAt)}
                {post.category ? ` - ${post.category}` : ""}
              </time>

              <Link href={`/noticias/${post.slug}`}>
                <h3 className="card-title mt-3 text-lg text-gray-900 transition hover:text-[#E8452C] sm:text-xl">
                  {post.title}
                </h3>
              </Link>

              {post.excerpt ? (
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {post.excerpt}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <PaginationNav
        basePath="/noticias"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
