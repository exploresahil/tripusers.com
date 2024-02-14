import { PortableTextBlock } from "sanity";

export type Hotspot = {
  width: number;
  height: number;
  x: number;
  y: number;
};
export type CardImageHotspot = Hotspot;

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
  addOns: {
    isHotels: boolean;
    isFood: boolean;
    isTransport: boolean;
    isFlight: boolean;
    isSightseeing: boolean;
    isVisa: boolean;
  };
  deal: string;
  price: number;
  priceSubtitle: string;
  aboutTheTour: PortableTextBlock[];
  inclusion: PortableTextBlock[];
  exclusion: PortableTextBlock[];
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
  cardImageHotspot: CardImageHotspot;
  isTrending: boolean;
  isTrendingHome: boolean;
  isTrendingHomeIndex: string;
  isTrendingSlider: boolean;
  bannerImages: {
    _id: string;
    url: string;
  }[];
  internationalPackages: internationalPackages[];
};
