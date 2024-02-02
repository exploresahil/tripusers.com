import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const domesticPackage = {
  name: "domesticPackages",
  title: "Domestic Packages",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },
    {
      name: "place",
      title: "place",
      type: "reference",
      to: [{ type: "domestic" }],
    },
    {
      name: "packageImages",
      title: "Package Slider Images",
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
    {
      name: "timeline",
      title: "Timeline",
      type: "string",
    },
    {
      name: "deal",
      title: "Deal",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "priceSubtitle",
      title: "Price Subtitle",
      type: "string",
    },
    {
      name: "aboutTheTour",
      title: "About The Tour",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "day",
              title: "Day",
              type: "number",
            },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "content",
              title: "Content",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: "string",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "array",
                      of: [{ type: "block" }],
                    },
                    {
                      name: "images",
                      title: "Images",
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
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default domesticPackage;
