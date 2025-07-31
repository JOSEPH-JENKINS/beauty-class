import groq from "groq";

export const allPostsQuery = groq`
  *[_type == "post"] | order(date asc) {
    _id,
    title,
    body,
    excerpt,
    slug {
        current
    },
    category-> {
      title,
      slug
    },
    publishedAt,
    coverImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;

export const blogPageQuery = groq`
  *[_type == "blogPage"][0] {
    _id,
    heading,
    video {
      asset->{
        _id,
        url,
        mimeType
      }
    },
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post"] | order(date asc)[0...5] {
    _id,
    title,
    body,
    excerpt,
    slug {
        current
    },
    category-> {
      title,
      slug
    },
    publishedAt,
    coverImage {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;
