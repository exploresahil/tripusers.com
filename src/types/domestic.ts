import { PortableTextBlock } from "sanity";
export type DomesticPackages = {
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

export type Domestic = {
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
  domesticPackages: DomesticPackages[];
};