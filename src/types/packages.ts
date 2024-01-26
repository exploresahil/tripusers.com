interface Asset {
  _id: string;
  url: string;
}

interface Country {
  _id: string;
  _createdAt: string;
  countryName: string;
  cardImage: string; // Assuming cardImage is a URL
  countryImages: Asset[];
}

interface Content {
  title: string;
  description: string[];
  images: Asset[];
}

interface Itinerary {
  title: string;
  day: number;
  description: string[];
  content: Content[];
}

export type packages = {
  _id: string;
  _createdAt: string;
  title: string;
  slug: string;
  country: Country;
  packageImages: Asset[];
  timeline: string;
  deal: string;
  price: number;
  priceSubtitle: string;
  aboutTheTour: string[];
  itinerary: Itinerary[];
};
