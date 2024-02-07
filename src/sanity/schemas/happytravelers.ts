import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

export const HomeHappyTravelers = {
  name: "travelers",
  title: "Happy Travelers",
  type: "document",
  fields: [
    {
      name: "heading",
      title: "Heading of home section",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle of home section",
      type: "string",
    },
  ],
};

export const Profile = {
  name: "profile",
  title: "profile of happy traveler",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "profilePic",
      title: "profile pic",
      type: "image",
      options: { hotspot: true },
      sources: [unsplashAssetSource],
    },
  ],
};

export const HappyTravelerStory = {
  name: "stroy",
  title: "Story of happy traveler",
  type: "document",
  fields: [
    {
      name: "title",
      title: "title of story",
      type: "string",
    },
    {
      name: "trading",
      title: "this story show on home page",
      type: "boolean",
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
      name: "hashTags",
      title: "Hash tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        layout: "grid",
      },
    },
    {
      name: "shortDis",
      title: "Short description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "profile",
      title: "Profile",
      type: "reference",
      to: [{ type: "profile" }],
    },
    {
      name: "trip",
      title: "trip to",
      type: "string",
    },
    {
      name: "rating",
      title: "rating",
      type: "number",
    },
    {
      name: "blogImages",
      title: "all blog images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          sources: [unsplashAssetSource],
        },
      ],
    },
    {
      name: "fullBlog",
      title: "full blog",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
