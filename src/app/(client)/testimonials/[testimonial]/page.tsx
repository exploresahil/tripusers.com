"use client";

import "./style.scss";
import PageLoading from "@/src/components/default/loader/PageLoading";
import { getTestimonialSlug, getTrending } from "@/src/sanity/sanity-utils";
import Testimonial from "@/src/types/testimonials";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { trending } from "@/src/types/trending";
import { AiFillStar } from "react-icons/ai";
import { PortableText } from "@portabletext/react";
import ImageSize from "@/src/utils/image-utils";

type Props = {
  params: { testimonial: string };
};

const page = ({ params }: Props) => {
  const [testimonialData, setTestimonialData] = useState<Testimonial>();
  const [trending, setTrending] = useState<trending>();

  const slug = params.testimonial;

  const fetchTrendingData = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  useEffect(() => {
    async function fetchTestimonialSlug() {
      try {
        const data = await getTestimonialSlug(slug);
        setTestimonialData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchTestimonialSlug();
  }, [slug]);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  //console.log("TestimonialSlug ->", testimonialData);
  //console.log("trending ->", trending);

  const getStarColor = (
    rating: string | undefined,
    starIndex: number
  ): string => {
    const ratingValue = rating ? parseInt(rating.split("-")[0]) : 0;
    return starIndex < ratingValue ? "#fd8f04" : "#1d1d1f";
  };

  if (!testimonialData) {
    return <PageLoading />;
  }

  return (
    <>
      <section id="testimonialSlugHero">
        <Swiper
          effect={"fade"}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          //navigation={true}
          //onSlideChange={onSildeChange}
          loop={true}
          modules={[EffectFade, Navigation, Autoplay]}
          className="mySwiper"
          speed={500}
          allowTouchMove={false}
          slidesPerView={1}
        >
          {testimonialData.images.map((item, index) => (
            <SwiperSlide key={index} className="swiperSlide-card">
              <div className="bg-container">
                <div className="bg" />
                <Image
                  src={item.url}
                  alt="hero background"
                  fill
                  sizes={ImageSize.bannerSizes}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-container">
          <p>{trending?.testimonialName}</p>
          <h2>{testimonialData?.title}</h2>
        </div>
      </section>
      <section id="testimonialSlugData">
        <div className="top">
          <div className="img-container">
            <Image
              src={testimonialData?.cardImage}
              alt="hero background"
              fill
              sizes={ImageSize.cardSize}
            />
          </div>
          <div className="right">
            <h2>{testimonialData?.title}</h2>

            <div className="hashtags">
              {testimonialData.hashtags?.map((data, index) => (
                <p key={index}>#{data.name}</p>
              ))}
            </div>
            <p className="shortReview">{testimonialData?.shortReview}</p>
            <div className="profile-container">
              <div className="profile">
                <div className="img-container">
                  {testimonialData?.profile.image ? (
                    <Image
                      src={testimonialData?.profile.image}
                      alt="hero background"
                      fill
                      sizes={ImageSize.cardSize}
                    />
                  ) : (
                    <h5>{testimonialData?.profile.name.charAt(0)}</h5>
                  )}
                </div>
                <div className="profile-info">
                  <h4>{testimonialData?.profile.name}</h4>
                  <p>{testimonialData?.reviewDate.toString()}</p>
                </div>
              </div>
              <div className="rating-container">
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <AiFillStar
                      key={starIndex}
                      style={{
                        color: getStarColor(testimonialData?.rating, starIndex),
                      }}
                    />
                  ))}
                </div>
                <p>Trip to {testimonialData?.tripTo}</p>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={true}
          //onSlideChange={onSildeChange}
          loop={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          speed={500}
          allowTouchMove={false}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            820: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1025: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {testimonialData &&
            testimonialData?.images.map((item, index) => (
              <SwiperSlide key={index} className="swiperSlide-card">
                <Image
                  src={item.url}
                  alt="hero background"
                  fill
                  sizes={ImageSize.cardSize}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="full-review">
          <PortableText value={testimonialData?.fullReview} />
        </div>
      </section>
    </>
  );
};

export default page;
