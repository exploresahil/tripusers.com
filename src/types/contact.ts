import { PortableTextBlock } from "sanity";

export type contactUs = {
  _id: string;
  _createdAt: Date;
  title: string;
  bannerImage: {
    _id: string;
    url: string;
  };
  bannerInfoSubtitle: string;
  formInfo: string;
  Address: PortableTextBlock[];
  Email: string;
  Phone: string;
  ourOfficesSubtitle: string;
  offices: {
    location: string;
    Address: PortableTextBlock[];
  }[];
};
