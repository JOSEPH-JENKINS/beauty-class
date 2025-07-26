// plugins/init-settings.client.ts
export default defineNuxtPlugin(async () => {
  const { settings, fetchSettings } = useSettings();

  await fetchSettings();

  const design = settings.value?.design;
  if (!design) {
    console.warn("Design settings not found");
    return;
  }

  const root = document.documentElement;

  const apply = (key, value) => {
    if (value != null) {
      root.style.setProperty(
        `--${key}`,
        typeof value === "number" ? `${value}px` : value
      );
    }
  };

  apply("font-family", design.font);
  apply("body-size", design.bodySize);
  apply("header-size", design.headerSize);
  apply("hero-header-size", design.heroHeaderSize);
  apply("item-spacing", design.itemSpacing);
  apply("section-spacing", design.sectionSpacing);
  apply("top-margin", design.topMargin);
  apply("mobile-top-margin", design.mobileTopMargin);
  apply("side-margin", design.sideMargin);
  apply("mobile-side-margin", design.mobileSideMargin);
  apply("button-accent-color", design.buttonAccentColor);
  apply("secondary-header-color", design.secondaryHeaderColor);
});
