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

export const allEventsWithTestimonialsQuery = groq`
  *[_type == "event"] | order(date desc){
    _id,
    title,
    description,
    date,
    location,
    image {
      asset->{
        url
      }
    },
    testimonials[]->{
      _id,
      name,
      quote,
      role,
      image {
        asset->{
          url
        }
      }
    }
  }
`;
