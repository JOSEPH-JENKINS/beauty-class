import groq from "groq";

export const blogPostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    writer,
    publishedAt,
    excerpt,
    slug {
    current
    },
    body[]{
    ...,
    asset->{
      url
    }
    },
    category-> {
    title
    },
    coverImage {
      asset->{
        url
      }
    },
    publishedAt
  }
`;
