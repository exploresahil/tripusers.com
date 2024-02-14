import { PortableTextBlock } from "sanity";

export type Testimonial = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: {
    current: string;
  };
  reviewDate: Date;
  tripTo: string;
  cardImage: string;
  profile: {
    name: string;
    image: string;
  };
  rating: string;
  shortReview: string;
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
