import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const ContactPage = {
  name: "contactUs",
  title: "Contact us",
  type: "document",
  fields: [
    {
      name: "bannerImage",
      title: "Banner image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
    },
    {
      name: "bannerInfoSubtitle",
      title: "banner subtitle",
      type: "string",
    },
    {
      name: "fromInfo",
      title: "Promise to client",
      type: "string",
    },
    {
      name: "Address",
      title: "Address",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "Email",
      title: "Email",
      type: "string",
    },
    {
      name: "Phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "ourOfficesSubtitle",
      title: "Subtitle in our office section",
      type: "string",
    },
    {
      name: "offices",
      title: "Offices Address",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "location",
              title: "Location",
              type: "string",
            },
            {
              name: "Address",
              title: "Full Address",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
  ],
};
export default ContactPage;
