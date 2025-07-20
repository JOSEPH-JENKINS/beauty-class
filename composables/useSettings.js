// composables/useSettings.ts
import { siteDefaults } from "@/queries/siteDefaults"; // or wherever your GROQ lives
import { useSanityQuery } from "#imports";

export const useSettings = () => {
  const settings = useState("site-settings", () => null);

  const fetchSettings = async () => {
    if (settings.value) return; // already fetched

    const { data, error } = await useSanityQuery(siteDefaults);
    if (error.value) {
      console.error("Failed to fetch site settings", error.value);
      return;
    }

    settings.value = data.value;
  };

  return { settings, fetchSettings };
};
