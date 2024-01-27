import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const country = {
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    {
      name: "countryName",
      title: "Country Name",
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
      name: "countryImages",
      title: "Country Images",
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

export default country;
