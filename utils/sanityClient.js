import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "cc2xy89a",
  dataset: "production",
  useCdn: true, // or false if you want fresh data always
});
