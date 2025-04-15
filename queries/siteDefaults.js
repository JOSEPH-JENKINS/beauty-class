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
    navigation,
    footerText,
    footerLinks,
    socialLinks
  }
`;
