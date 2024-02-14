"use client";

import { getTestimonials, getTrending } from "@/src/sanity/sanity-utils";
import Testimonial from "@/src/types/testimonials";
import { useEffect, useState } from "react";
import "./style.scss";
import { trending } from "@/src/types/trending";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const page = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [trending, setTrending] = useState<trending>();

  const fetchTrendingData = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  const fetchTestimonials = async () => {
    const data = await getTestimonials();
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTrendingData();
    fetchTestimonials();
  }, []);

  console.log("Testimonials ->", testimonials);

  return (
    <>
      <section id="testimonialsHero">
        {testimonials?.length > 0 && (
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
            {testimonials?.map((data, index) => (
              <SwiperSlide key={index} className="swiperSlide-card">
                <div className="bg-container">
                  <div className="bg" />
                  <Image
                    src={data?.cardImage}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="text-container">
          <p>{trending?.testimonialSubtitle}</p>
          <h2>{trending?.testimonialName}</h2>
        </div>
      </section>
    </>
  );
};

export default page;
