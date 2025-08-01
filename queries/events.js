import groq from "groq";

export const eventPageQuery = groq`
  *[_type == "eventPage"][0] {
    _id,
    heading,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
      }
    },
  }
`;

export const allEventsQuery = groq`
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    excerpt,
    description,
    slug {
      current
    },
    date,
    location,
    price,
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
  *[_type == "event"] | order(date asc){
    _id,
    title,
    excerpt,
    description,
    slug {
      current
    },
    date,
    price,
    eventType,
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

export const singleEventQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    description,
    slug {
      current
    },
    date,
    location,
    price,
    eventType,
    image {
      asset->{
        _id,
        url,
        metadata { lqip, dimensions }
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
