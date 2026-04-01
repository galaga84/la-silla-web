import {defineField, defineType} from "sanity";

export const subscriberType = defineType({
  name: "subscriber",
  title: "Suscriptores",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Correo",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Ingresa un correo valido."),
    }),
    defineField({
      name: "source",
      title: "Origen",
      type: "string",
      initialValue: "website-home",
    }),
    defineField({
      name: "subscribedAt",
      title: "Fecha de suscripcion",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "subscribedAt",
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? `Suscrito: ${subtitle}` : "Sin fecha",
      };
    },
  },
});
