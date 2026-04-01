import {defineField, defineType} from "sanity";

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
      validation: (Rule) => Rule.required(),
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
      subtitle: "city",
    },
  },
});
