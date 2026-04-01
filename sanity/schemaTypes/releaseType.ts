import {defineField, defineType} from "sanity";

export const releaseType = defineType({
  name: "release",
  title: "Lanzamientos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artista",
      type: "reference",
      to: [{type: "artist"}],
    }),
    defineField({
      name: "format",
      title: "Formato",
      type: "string",
      options: {
        list: ["Single", "EP", "Álbum", "Cassette", "Vinilo", "CD"],
      },
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "number",
    }),
    defineField({
      name: "cover",
      title: "Portada",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "array",
      of: [{type: "block"}],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "artist.name",
      media: "cover",
    },
  },
});
