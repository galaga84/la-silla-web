import {defineField, defineType} from "sanity";

type ShowDocument = {
  artist?: {
    _ref?: string;
  };
  externalArtistName?: string;
};

export const showType = defineType({
  name: "show",
  title: "Fechas",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artista",
      type: "reference",
      to: [{type: "artist"}],
      description: "Opcional. Úsalo para artistas que ya pertenecen al catálogo.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasExternalArtistName = Boolean(
            (context.document as ShowDocument | undefined)?.externalArtistName?.trim(),
          );

          if (value?._ref && hasExternalArtistName) {
            return "Usa un artista del catálogo o un nombre externo, pero no ambos.";
          }

          return true;
        }),
    }),
    defineField({
      name: "externalArtistName",
      title: "Grupo o proyecto externo",
      type: "string",
      description: "Opcional. Úsalo cuando la fecha sea de un proyecto que no pertenece al sello.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasArtist = Boolean((context.document as ShowDocument | undefined)?.artist?._ref);

          if (value?.trim() && hasArtist) {
            return "Usa un artista del catálogo o un nombre externo, pero no ambos.";
          }

          return true;
        }),
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Ciudad",
      type: "string",
    }),
    defineField({
      name: "venue",
      title: "Recinto",
      type: "string",
    }),
    defineField({
      name: "ticketUrl",
      title: "Link de entradas",
      type: "url",
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: ["Entradas disponibles", "Últimos tickets", "Próximamente", "Agotado"],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      artist: "artist.name",
      externalArtistName: "externalArtistName",
      city: "city",
    },
    prepare({title, artist, externalArtistName, city}) {
      return {
        title,
        subtitle: [artist ?? externalArtistName, city].filter(Boolean).join(" - "),
      };
    },
  },
});
