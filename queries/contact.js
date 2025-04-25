import groq from "groq";

export const contactQuery = groq`
*[_type == "contactPage"][0]{
    heading,
    description,
}
`;
