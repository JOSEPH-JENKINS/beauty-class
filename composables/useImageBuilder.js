import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/utils/sanityClient";

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source) =>
  builder.image(source).auto("format").quality(90);
