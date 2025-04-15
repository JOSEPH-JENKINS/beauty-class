import groq from "groq";

export const homepageQuery = groq`
  *[_type == "homepage"][0]
`;
