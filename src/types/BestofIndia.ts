import { PortableTextBlock } from "sanity";
import { packages } from "./country";

export type BestOfIndia = {
  _id: string;
  _createdAt: Date;
  stateName: string;
  slug: {
    current: string;
  };
  cardImage: string;
  isTrending: boolean;
  StateImages: {
    _id: string;
    url: string;
  }[];
  packages: packages[];
};
