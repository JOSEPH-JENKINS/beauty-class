import groq from "groq";

export const founderQuery = groq`
    *[_type == "founderPage"][0] {
        _id,
        name,
        bio,
        image {
            asset -> {
                url
            }
        }
    }
`;
