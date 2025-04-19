import groq from "groq";

export const allArtistsQuery = groq`
  *[_type == "artist"]{
    _id,
    name,
    subheading,
    image {
      asset->{
        url,
        metadata { dimensions }
      }
    }
  }
`;
