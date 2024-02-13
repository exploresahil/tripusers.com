import { PortableTextBlock } from "sanity";

export type Testimonial = {
  _id: string;
  _type: "testimonials";
  title: string;
  slug: {
    current: string;
  };
  cardImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot: {
      height: number;
      width: number;
      x: number;
      y: number;
    };
  };
  isTrending: boolean;
  shortReview?: string;
  hashtags?: {
    name: string;
  }[];
  images: {
    _id: string;
    url: string;
  }[];
  fullReview: PortableTextBlock[];
};

export default Testimonial;
