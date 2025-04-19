import groq from "groq";

export const allCategoriesQuery = groq`
*[_type=="category"] | order(date asc) {
    _id,
    title,
    slug {
        current
    }
}
`;
