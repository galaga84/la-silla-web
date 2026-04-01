import Image from "next/image";
import Link from "next/link";
import {PortableText} from "@portabletext/react";
import type {PortableTextBlock} from "@portabletext/types";
import {notFound} from "next/navigation";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {newsBySlugQuery} from "@/sanity/lib/queries";

type NewsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type NewsPost = {
  title: string;
  category?: string;
  publishedAt?: string;
  mainImage?: unknown;
  body?: PortableTextBlock[];
};

function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export default async function NewsDetailPage({params}: NewsPageProps) {
  const {slug} = await params;
  const post = await client.fetch<NewsPost | null>(newsBySlugQuery, {slug});

  if (!post) {
    notFound();
  }

  return (
    <main className="container-site section-space">
      <article className="mx-auto max-w-4xl">
        <p className="eyebrow">Noticias</p>
        <h1 className="heading-lg mt-4">{post.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
          {post.category ? <span>{post.category}</span> : null}
          {post.category && post.publishedAt ? <span>-</span> : null}
          {post.publishedAt ? <span>{formatDate(post.publishedAt)}</span> : null}
        </div>

        {post.mainImage ? (
          <div className="shape-panel relative mt-10 aspect-[16/9] overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1600).height(900).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        {post.body?.length ? (
          <div className="body-lg mt-10 space-y-6 text-zinc-700">
            <PortableText value={post.body} />
          </div>
        ) : null}

        <div className="mt-10">
          <Link href="/noticias" className="button-secondary inline-flex">
            <span>Volver a noticias</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
