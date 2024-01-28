import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const BestOfIndia = {
  name: "Indian",
  title: "Best of India",
  type: "document",
  fields: [
    {
      name: "Name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "countryName",
      },
    },
    {
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
    },
    {
      name: "StateImages",
      title: "State Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          sources: [unsplashAssetSource],
        },
      ],
      options: {
        layout: "grid",
      },
    },
  ],
};

export default BestOfIndia;
