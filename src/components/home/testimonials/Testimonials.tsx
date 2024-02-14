"use client";

import { BsStars } from "react-icons/bs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import { trending } from "@/src/types/trending";
import {
  getTrending,
  getTrendingTestimonials,
} from "@/src/sanity/sanity-utils";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCards, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import Testimonial from "@/src/types/testimonials";

const Testimonials = () => {
  const [trending, setTrending] = useState<trending>();
  const [trendingTestimonial, setTrendingTestimonial] = useState<Testimonial[]>(
    []
  );

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const fetchTrendingData = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  const fetchTrendingTestimonialData = async () => {
    const trendingTestimonialData = await getTrendingTestimonials();
    setTrendingTestimonial(() => trendingTestimonialData.slice(1, 5));
  };

  useEffect(() => {
    fetchTrendingData();
    fetchTrendingTestimonialData();
  }, []);
  // const ImageSwiperRef = useRef<SwiperRef>(null);
  // const TextSwiperRef = useRef<SwiperRef>(null);
  // const [SlideIndex, setSlideIndex] = useState(0);
  // console.log("SlideIndex -> ", SlideIndex);
  // useEffect(() => {
  //   console.log(
  //     ImageSwiperRef.current?.swiper.activeIndex,
  //     TextSwiperRef?.current?.swiper.activeIndex
  //   );

  //   TextSwiperRef?.current?.swiper?.slideTo(
  //     ImageSwiperRef.current?.swiper.activeIndex || 0
  //   );
  // }, [SlideIndex]);
  //console.log("fetchTrending ->", trending);
  //console.log("fetchTrendingTestimonial ->", trendingTestimonial);

  return (
    <section id="testimonials">
      <div className="title-container">
        <BsStars size={40} />
        <h2>{trending?.testimonialName}</h2>
        <p>{trending?.testimonialSubtitle}</p>
        <Link href="/domestic">View All</Link>
      </div>
      <div className="testimonials-container">
        {trendingTestimonial.length > 0 && (
          <>
            <Swiper
              // ref={ImageSwiperRef}
              initialSlide={0}
              effect={"cards"}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              loop={true}
              modules={[Navigation, Autoplay, EffectCards]}
              className="mySwiper-images"
              speed={500}
              allowTouchMove={false}
              slidesPerView={"auto"}
              cardsEffect={{
                rotate: false,
                slideShadows: false,
              }}
              // onSlideChange={(swiper) => {
              //   setSlideIndex(swiper.realIndex);
              // }}
            >
              {trendingTestimonial.map((data, index) => (
                <SwiperSlide key={index} className="swiperSlide-card">
                  <Link href="#">
                    <Image
                      src={data?.cardImage}
                      alt="hero background"
                      fill
                      sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                    />
                  </Link>
                </SwiperSlide>
              ))}
              <div className="prev" ref={prevRef}>
                prev
              </div>
              <div className="next" ref={nextRef}>
                next
              </div>
            </Swiper>
            <Swiper
              // ref={TextSwiperRef}
              initialSlide={3}
              effect={"fade"}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              loop={true}
              modules={[Autoplay, EffectFade, Navigation]}
              className="mySwiper-content"
              speed={500}
              allowTouchMove={false}
              slidesPerView={"auto"}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
            >
              {trendingTestimonial.map((data, index) => (
                <SwiperSlide key={index} className="swiperSlide-card">
                  <Link href="#">
                    <h3>{data?.title}</h3>
                  </Link>
                  <div className="hashtags">
                    {data.hashtags?.map((data, index) => (
                      <p key={index}>#{data.name}</p>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
