export type hero = {
  _id: string;
  createdAt: Date;
  title: string;
  country: {
    _id: string;
    _createdAt: Date;
    countryName: string;
    slug: string;
    cardImage: string;
    countryImages: {
      _id: string;
      url: string;
    }[];
  };
  heroImage: string;
}[];
