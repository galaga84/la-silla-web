import {defineQuery} from "next-sanity";

export const homeNewsQuery = defineQuery(`
  *[_type == "news" && defined(slug.current)] 
  | order(coalesce(publishedAt, _createdAt) desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    excerpt,
    mainImage
  }
`);