import groq from "groq";

export const aboutQuery = groq`*[_type == "aboutPage"][0]`;
