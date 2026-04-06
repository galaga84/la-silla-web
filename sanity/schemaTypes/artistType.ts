import {defineField, defineType} from "sanity";
import {DEFAULT_SLUG_MAX_LENGTH, slugifyValue, validateSlug} from "./slug";

export const artistType = defineType({
  name: "artist",
  title: "Artistas",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: DEFAULT_SLUG_MAX_LENGTH,
        slugify: (input) => slugifyValue(input, DEFAULT_SLUG_MAX_LENGTH),
      },
      validation: (Rule) => Rule.required().custom(validateSlug),
    }),
    defineField({
      name: "genre",
      title: "Género",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biografía",
      type: "array",
      of: [{type: "block"}],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "genre",
      media: "image",
    },
  },
});
