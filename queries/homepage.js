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
        testimonials[0..5]->{
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

      
      _type == 'aboutSection' => {
        _key,
        _type,
        heading,
        excerpt,
        ctaLabel,
        image {
          asset->{ url, metadata }
        }
      },

      _type == "softCtaSection" => {
        ctaLabel,
        ctaLink,
        paragraph,
        logo {
          asset->{
            url
          }
        },
        backgroundImage {
          asset->{
            url,
            metadata { lqip, dimensions }
          }
        }
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
      _type == "instagramSection" => {
        _type,
        heading,
        ctaLabel,
        ctaLink,
        posts[]{
          postUrl,
          image {
            asset->{
              url,
              metadata {
                lqip,
                dimensions
              }
            }
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
    },
  }
`;
