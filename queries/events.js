import groq from "groq";

export const allEventsQuery = groq`
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    description,
    date,
    location,
    eventbriteLink,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    }
  }
`;
