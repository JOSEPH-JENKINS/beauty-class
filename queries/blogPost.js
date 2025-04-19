import groq from "groq";

export const blogPostQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    excerpt,
    slug {
    current
    },
    body,
    category {
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
