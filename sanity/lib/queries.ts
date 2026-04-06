import {defineQuery} from "next-sanity";

export const homeNewsQuery = defineQuery(`
  *[_type == "news" && (defined(slug.current) || defined(externalUrl))]
  | order(coalesce(publishedAt, _createdAt) desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    externalUrl,
    category,
    publishedAt,
    excerpt,
    mainImage
  }
`);

export const allNewsQuery = defineQuery(`
  *[_type == "news" && (defined(slug.current) || defined(externalUrl))]
  | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    externalUrl,
    category,
    publishedAt,
    excerpt,
    mainImage
  }
`);

export const paginatedNewsQuery = defineQuery(`
  {
    "items": *[_type == "news" && (defined(slug.current) || defined(externalUrl))]
      | order(coalesce(publishedAt, _createdAt) desc)[$start...$end]{
        _id,
        title,
        "slug": slug.current,
        externalUrl,
        category,
        publishedAt,
        excerpt,
        mainImage
      },
    "total": count(*[_type == "news" && (defined(slug.current) || defined(externalUrl))])
  }
`);

export const newsBySlugQuery = defineQuery(`
  *[_type == "news" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    externalUrl,
    category,
    publishedAt,
    excerpt,
    mainImage,
    body
  }
`);

export const featuredArtistsQuery = defineQuery(`
  *[_type == "artist" && defined(slug.current)]
  | order(_createdAt desc)[0...3]{
    _id,
    name,
    "slug": slug.current,
    genre,
    image,
    bio
  }
`);

export const allArtistsQuery = defineQuery(`
  *[_type == "artist" && defined(slug.current)]
  | order(name asc){
    _id,
    name,
    "slug": slug.current,
    genre,
    image,
    bio
  }
`);

export const paginatedArtistsQuery = defineQuery(`
  {
    "items": *[_type == "artist" && defined(slug.current)]
      | order(name asc)[$start...$end]{
        _id,
        name,
        "slug": slug.current,
        genre,
        image,
        bio
      },
    "total": count(*[_type == "artist" && defined(slug.current)])
  }
`);

export const artistBySlugQuery = defineQuery(`
  *[_type == "artist" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    genre,
    image,
    bio,
    "releases": *[_type == "release" && artist._ref == ^._id] | order(year desc, _createdAt desc){
      _id,
      title,
      "slug": slug.current,
      format,
      year,
      cover
    },
    "shows": *[_type == "show" && artist._ref == ^._id] | order(date desc)[0...6]{
      _id,
      title,
      date,
      city,
      venue,
      ticketUrl,
      status
    },
    "videos": *[_type == "video" && artist._ref == ^._id] | order(year desc, _createdAt desc)[0...6]{
      _id,
      title,
      type,
      year,
      thumbnail,
      videoUrl,
      description
    }
  }
`);

export const recentReleasesQuery = defineQuery(`
  *[_type == "release" && defined(slug.current)]
  | order(year desc, _createdAt desc)[0...4]{
    _id,
    title,
    "slug": slug.current,
    format,
    year,
    cover,
    description,
    "artist": artist->name
  }
`);

export const allReleasesQuery = defineQuery(`
  *[_type == "release" && defined(slug.current)]
  | order(year desc, _createdAt desc){
    _id,
    title,
    "slug": slug.current,
    format,
    year,
    cover,
    description,
    "artist": artist->name
  }
`);

export const paginatedReleasesQuery = defineQuery(`
  {
    "items": *[_type == "release" && defined(slug.current)]
      | order(year desc, _createdAt desc)[$start...$end]{
        _id,
        title,
        "slug": slug.current,
        format,
        year,
        cover,
        description,
        "artist": artist->name
      },
    "total": count(*[_type == "release" && defined(slug.current)])
  }
`);

export const releaseBySlugQuery = defineQuery(`
  *[_type == "release" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    format,
    year,
    cover,
    description,
    "artist": artist->{
      _id,
      name,
      "slug": slug.current,
      genre,
      image
    }
  }
`);

export const upcomingShowsQuery = defineQuery(`
  *[_type == "show" && date >= $now]
  | order(date asc)[0...3]{
    _id,
    title,
    date,
    city,
    venue,
    ticketUrl,
    status,
    "artist": coalesce(artist->name, externalArtistName)
  }
`);

export const showsPageQuery = defineQuery(`
  {
    "upcoming": *[_type == "show" && date >= $now] | order(date asc){
      _id,
      title,
      date,
      city,
      venue,
      ticketUrl,
      status,
      "artist": coalesce(artist->name, externalArtistName)
    },
    "past": *[_type == "show" && date < $now] | order(date desc)[0...6]{
      _id,
      title,
      date,
      city,
      venue,
      "artist": coalesce(artist->name, externalArtistName)
    }
  }
`);

export const paginatedShowsPageQuery = defineQuery(`
  {
    "upcoming": *[_type == "show" && date >= $now] | order(date asc){
      _id,
      title,
      date,
      city,
      venue,
      ticketUrl,
      status,
      "artist": coalesce(artist->name, externalArtistName)
    },
    "past": *[_type == "show" && date < $now] | order(date desc)[$start...$end]{
      _id,
      title,
      date,
      city,
      venue,
      "artist": coalesce(artist->name, externalArtistName)
    },
    "pastTotal": count(*[_type == "show" && date < $now])
  }
`);

export const allVideosQuery = defineQuery(`
  *[_type == "video"]
  | order(year desc, _createdAt desc){
    _id,
    title,
    type,
    year,
    thumbnail,
    videoUrl,
    description,
    "artist": artist->name
  }
`);

export const paginatedVideosQuery = defineQuery(`
  {
    "items": *[_type == "video"]
      | order(year desc, _createdAt desc)[$start...$end]{
        _id,
        title,
        type,
        year,
        thumbnail,
        videoUrl,
        description,
        "artist": artist->name
      },
    "total": count(*[_type == "video"])
  }
`);
