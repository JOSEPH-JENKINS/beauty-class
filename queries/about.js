import groq from "groq";

export const aboutQuery = groq`
*[_type == "aboutPage"][0]{
    content[]{
    ...,
    asset->{
      url
    }
    },
    title,
    mainImage {
        asset->{
            _id,
            url,
            metadata { lqip, dimensions }
        }
    },
    secondaryImage {
        asset->{
            _id,
            url,
            metadata { lqip, dimensions }
        }
    }
}
`;
