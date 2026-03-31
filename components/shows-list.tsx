import {client} from "@/sanity/lib/client";
import {PaginationNav} from "@/components/pagination-nav";
import {paginatedShowsPageQuery} from "@/sanity/lib/queries";

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

type ShowsData = {
  upcoming: ShowItem[];
  past: ShowItem[];
  pastTotal: number;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

type ShowsListProps = {
  currentPage: number;
  pageSize: number;
};

export async function ShowsList({currentPage, pageSize}: ShowsListProps) {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const data = await client.fetch<ShowsData>(paginatedShowsPageQuery, {
    now: new Date().toISOString(),
    start,
    end,
  });
  const totalPages = Math.max(1, Math.ceil(data.pastTotal / pageSize));

  return (
    <section className="mt-12 space-y-12">
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Agenda</p>
            <h2 className="heading-lg mt-3">Proximas presentaciones</h2>
          </div>
        </div>

        <div className="mt-8 divide-y divide-black/10 overflow-hidden rounded-3xl border border-black/10 bg-zinc-50">
          {data.upcoming.map((show) => (
            <article
              key={show._id}
              className="grid gap-4 px-6 py-6 md:grid-cols-[170px_1fr_auto] md:items-center"
            >
              <div className="text-sm uppercase tracking-[0.16em] text-zinc-500">
                {formatDate(show.date)}
              </div>

              <div>
                <h3 className="text-xl font-semibold tracking-tight">{show.artist || show.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  {[show.city, show.venue].filter(Boolean).join(" - ")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden text-sm text-zinc-500 sm:inline">
                  {show.status}
                </span>
                {show.ticketUrl ? (
                  <a href={show.ticketUrl} target="_blank" rel="noreferrer" className="button-secondary">
                    <span>Mas info</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div>
        <div>
          <p className="eyebrow">Archivo</p>
          <h2 className="heading-lg mt-3">Fechas recientes</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {data.past.map((show) => (
            <article key={show._id} className="card-dark">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {formatDate(show.date)}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{show.artist || show.title}</h3>
              <p className="body-md mt-3">
                {[show.city, show.venue].filter(Boolean).join(" - ")}
              </p>
            </article>
          ))}
        </div>

        <PaginationNav
          basePath="/fechas"
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}
