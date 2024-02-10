import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const special = {
  name: "special",
  title: "Special",
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
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "cardTitle",
      title: "Card Title",
      type: "string",
    },
    {
      name: "cardSubtitle",
      title: "Card Subtitle",
      type: "string",
    },
    {
      name: "bannerImages",
      title: "Banner Images",
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

export default special;
