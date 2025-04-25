import groq from "groq";

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    pageBuilder[] {
      _key,
      _type,
      // For heroSection
      _type == "heroSection" => {
  _type,
  heading,
  ctaLabel,
  ctaLink,
  video {
    asset->{
      _id,
      url,
      mimeType
    }
  }
},
      // For testimonialSection with reference dereferencing
      _type == "testimonialSection" => {
        _type,
        title,
        testimonials[]->{
          _id,
          name,
          quote,
          role,
          image {
            asset->{
              url,
              metadata { lqip, dimensions }
            }
          }
        }
      },

      _type == "softCtaSection" => {
        ctaLabel,
        ctaLink,
        heading,
        paragraph
      },
      
      _type == "brandsSection" => {
        _type,
        logos[]{
          asset->{
            url,
            metadata { dimensions }
          }
        }
      },
      _type == "modalSection" => {
        _type,
        heading,
        subtext,
        ctaLabel,
        ctaLink
      }
    }
  }
`;
