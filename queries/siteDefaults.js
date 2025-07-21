// /queries/siteSettings.js
import groq from "groq";

export const siteDefaults = groq`
  *[_type == "siteSettings"][0]{
    logo {
      asset->{
        url,
        metadata { lqip, dimensions }
      }
    },
    logoAlt {
      asset->{
        url,
        metadata { lqip, dimensions }
      }
    },
    footerText,
    socialLinks,
    design {
      font,
      customFont,
      bodySize,
      heroHeaderSize,
      headerSize,
      itemSpacing,
      sectionSpacing
    }
  }
`;
