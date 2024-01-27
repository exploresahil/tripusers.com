export type packages = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: string;
  packageImages: {
    _id: string;
    url: string;
  }[];
  timeline: string;
  deal: string;
  price: number;
  priceSubtitle: string;
  aboutTheTour: string;
  itinerary: {
    title: string;
    day: number;
    description: string;
    content: {
      title: string;
      description: string;
      images: {
        _id: string;
        url: string;
      }[];
    }[];
  }[];
}[];

export type Country = {
  _id: string;
  _createdAt: Date;
  countryName: string;
  slug: string;
  cardImage: string;
  countryImages: {
    _id: string;
    url: string;
  }[];
  packages: {
    _id: string;
    _createdAt: Date;
    title: string;
    slug: string;
    packageImages: {
      _id: string;
      url: string;
    }[];
    timeline: string;
    deal: string;
    price: number;
    priceSubtitle: string;
    aboutTheTour: string;
    itinerary: {
      title: string;
      day: number;
      description: string;
      content: {
        title: string;
        description: string;
        images: {
          _id: string;
          url: string;
        }[];
      }[];
    }[];
  }[];
}[];
