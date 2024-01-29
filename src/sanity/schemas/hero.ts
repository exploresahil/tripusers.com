import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const hero = {
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "international" }],
    },
    {
      name: "heroImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
    },
  ],
};

export default hero;
