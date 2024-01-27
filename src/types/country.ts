import { PortableTextBlock } from "sanity";
export type packages = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: {
    current: string;
  };
  packageImages: {
    _id: string;
    url: string;
  }[];
  timeline: string;
  deal: string;
  price: number;
  priceSubtitle: string;
  aboutTheTour: PortableTextBlock[];
  itinerary: {
    title: string;
    day: number;
    description: string;
    content: {
      title: string;
      description: PortableTextBlock[];
      images: {
        _id: string;
        url: string;
      }[];
    }[];
  }[];
};

export type Country = {
  _id: string;
  _createdAt: Date;
  countryName: string;
  slug: {
    current: string;
  };
  cardImage: string;
  isTrending: boolean;
  countryImages: {
    _id: string;
    url: string;
  }[];
  packages: packages[];
};
