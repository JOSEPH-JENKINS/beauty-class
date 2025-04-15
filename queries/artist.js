import groq from "groq"

export const artistQuery = groq`*[_type == "aboutPage"][0]`;