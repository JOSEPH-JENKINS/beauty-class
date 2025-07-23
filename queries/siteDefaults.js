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
    openGraphImage {
      asset->{
        url
      }
    },
    footerText,
    siteDescription,
    supportText,
    socialLinks,
    design {
      font,
      customFont,
      bodySize,
      heroHeaderSize,
      headerSize,
      itemSpacing,
      sectionSpacing,
      topMargin,
      sideMargin,
    }
  }
`;
