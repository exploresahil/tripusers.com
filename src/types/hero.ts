import { Country } from "./country";
export type hero = {
  _id: string;
  createdAt: Date;
  title: string;
  country: Country;
  heroImage: string;
};
