const heroInfo = {
  name: "heroInfo",
  title: "Hero Info",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
    },
  ],
};

export default heroInfo;
