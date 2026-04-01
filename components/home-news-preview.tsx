import Link from "next/link";
import Image from "next/image";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {homeNewsQuery} from "@/sanity/lib/queries";

type HomeNewsItem = {
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

export async function HomeNewsPreview() {
  const posts = await client.fetch<HomeNewsItem[]>(homeNewsQuery);

  return (
    <section className="bg-white">
      <div className="container-site border-t border-black/10 section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Noticias</p>
            <h2 className="heading-lg mt-4">Novedades del sello</h2>
            <p className="body-lg mt-5">
              Revisa anuncios, incorporaciones, cobertura, agenda y movimiento editorial del sello.
            </p>
          </div>

          <div>
            <Link href="/noticias" className="button-secondary">
              <span>Ver todas las noticias</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/noticias/${post.slug}`}
              className="group shape-panel overflow-hidden border border-black/8 bg-white shadow-[0_12px_34px_rgba(17,17,17,0.06)]"
            >
              <div className="relative mb-4 h-56 w-full overflow-hidden bg-zinc-100">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).width(1200).height(700).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  />
                ) : null}
              </div>

              <div className="bg-white p-4 sm:p-6">
                <time className="block text-xs uppercase tracking-[0.18em] text-gray-500">
                  {formatDate(post.publishedAt)}
                  {post.category ? `  -  ${post.category}` : ""}
                </time>

                <h3 className="card-title mt-3 text-lg text-gray-900 transition group-hover:text-[#E8452C] sm:text-xl">
                  {post.title}
                </h3>

                {post.excerpt ? (
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
