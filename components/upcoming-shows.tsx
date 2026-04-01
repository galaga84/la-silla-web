import Link from "next/link";
import {client} from "@/sanity/lib/client";
import {upcomingShowsQuery} from "@/sanity/lib/queries";

type ShowItem = {
  _id: string;
  title: string;
  artist?: string;
  date: string;
  city?: string;
  venue?: string;
  ticketUrl?: string;
  status?: string;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

export async function UpcomingShows() {
  const shows = await client.fetch<ShowItem[]>(upcomingShowsQuery, {
    now: new Date().toISOString(),
  });

  return (
    <section>
      <div className="container-site border-t border-black/10 section-space">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Fechas</p>
            <h2 className="heading-lg mt-3">Próximas presentaciones</h2>
          </div>

          <div>
            <Link href="/fechas" className="button-secondary">
              <span>Ver agenda</span>
            </Link>
          </div>
        </div>

        <div className="shape-frame mt-10 divide-y divide-black/10 border border-black/10 bg-zinc-50">
          {shows.map((show) => (
            <article
              key={show._id}
              className="grid gap-4 px-5 py-5 sm:px-6 sm:py-6 md:grid-cols-[180px_1fr_auto] md:items-center"
            >
              <div className="text-sm text-zinc-500">{formatDate(show.date)}</div>

              <div>
                <h3 className="card-title text-xl text-black">{show.artist || show.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  {[show.city, show.venue].filter(Boolean).join(" - ")}
                </p>
              </div>

              {show.ticketUrl ? (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary w-full sm:w-auto md:justify-self-end"
                >
                  <span>{show.status || "Más info"}</span>
                </a>
              ) : show.status ? (
                <span className="text-sm text-zinc-500">{show.status}</span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
