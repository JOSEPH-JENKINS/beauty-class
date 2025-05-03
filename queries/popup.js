import groq from "groq";

export const popupQuery = groq`
*[_type == "modalSection"][0]{
    heading,
    subtext,
    image {
        asset->{
            _id,
            url,
            metadata { lqip, dimensions }
        }
    },
    ctaLabel
}
`;
