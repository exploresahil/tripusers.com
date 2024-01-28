export type Testimonial = {
  _id: string;
  createdAt: Date;
  name: string;
  title: string;
  review: string;
  images: {
    _id: string;
    url: string;
  }[];
};
