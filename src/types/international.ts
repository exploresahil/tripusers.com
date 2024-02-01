import { PortableTextBlock } from "sanity";
export type internationalPackages = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: {
    current: string;
  };
  place: international;
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
    description: PortableTextBlock[];
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

export type international = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: {
    current: string;
  };
  cardImage: string;
  isTrending: boolean;
  bannerImages: {
    _id: string;
    url: string;
  }[];
  internationalPackages: internationalPackages[];
};
