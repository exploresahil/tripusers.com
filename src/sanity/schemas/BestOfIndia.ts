import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const BestOfIndia = {
  name: "Indian",
  title: "Best of Indian",
  type: "document",
  fields: [
    {
      name: "stateName",
      title: "State Name",
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
      name: "isTrending",
      title: "Is trending",
      type: "boolean",
      description: "Select true if this State is Trending, false otherwise",
      initialValue: false,
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
