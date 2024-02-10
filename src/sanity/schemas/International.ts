import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const international = {
  name: "international",
  title: "International",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "isTrending",
      title: "Is trending",
      type: "boolean",
      description: "Select true if this country is Trending, false otherwise",
      initialValue: false,
    },
    {
      name: "isTrendingHome",
      title: "Is trending on Home",
      type: "boolean",
      description:
        "Select true if this country is Trending and show it in home page, false otherwise",
      initialValue: false,
    },
    {
      name: "isTrendingSlider",
      title: "Is trending on Slider",
      type: "boolean",
      description:
        "Select true if this country is Trending on home slider, false otherwise",
      initialValue: false,
    },
    {
      name: "bannerImages",
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
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default international;
