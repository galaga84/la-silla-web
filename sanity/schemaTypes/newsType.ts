import {defineField, defineType} from "sanity";
import {DEFAULT_SLUG_MAX_LENGTH, slugifyValue, validateSlug} from "./slug";

export const newsType = defineType({
  name: "news",
  title: "Noticias",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "externalUrl",
      title: "Link externo",
      type: "url",
      description: "Usalo para notas de prensa publicadas en otros medios.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: DEFAULT_SLUG_MAX_LENGTH,
        slugify: (input) => slugifyValue(input, DEFAULT_SLUG_MAX_LENGTH),
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasExternalUrl = Boolean((context.document as {externalUrl?: string} | undefined)?.externalUrl);
          if (!hasExternalUrl && !value?.current) {
            return "El slug es obligatorio si la nota no tiene un link externo.";
          }

          return validateSlug(value);
        }),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Extracto",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [{type: "block"}],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasExternalUrl = Boolean((context.document as {externalUrl?: string} | undefined)?.externalUrl);
          if (hasExternalUrl || (value && value.length > 0)) {
            return true;
          }

          return "Agrega contenido o usa un link externo para notas de prensa.";
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
