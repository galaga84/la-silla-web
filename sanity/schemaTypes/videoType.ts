import {defineField, defineType} from "sanity";

export const videoType = defineType({
  name: "video",
  title: "Videos",
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
    }),
    defineField({
      name: "type",
      title: "Tipo de video",
      type: "string",
      options: {
        list: ["Videoclip", "Sesión en vivo", "Visualizer", "Editorial", "Registro en vivo"],
      },
    }),
    defineField({
      name: "year",
      title: "Año",
      type: "number",
    }),
    defineField({
      name: "thumbnail",
      title: "Miniatura",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "videoUrl",
      title: "URL del video",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "thumbnail",
    },
  },
});
