"use client";

import { AiFillStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./style.scss";
import { trending } from "@/src/types/trending";
import {
  getTrending,
  getTrendingTestimonials,
} from "@/src/sanity/sanity-utils";
import { SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCards, EffectFade } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import Testimonial from "@/src/types/testimonials";
function getRandomUniqueElements(array: any[], count: number) {
  // Shuffle the input array
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5);

  // Ensure count does not exceed array length
  count = Math.min(count, shuffledArray.length);

  // Select unique elements
  const result = [];
  const selectedIndices = new Set();
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * shuffledArray.length);
    if (!selectedIndices.has(randomIndex)) {
      result.push(shuffledArray[randomIndex]);
      selectedIndices.add(randomIndex);
    }
  }

  return result;
}
const Testimonials = () => {
  const [trending, setTrending] = useState<trending>();
  const [trendingTestimonial, setTrendingTestimonial] = useState<Testimonial[]>(
    []
  );

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const SwiperImageRef = useRef<any>();
  const SwiperTextRef = useRef<any>();

  const fetchTrendingData = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  const fetchTrendingTestimonialData = async () => {
    const trendingTestimonialData = await getTrendingTestimonials();
    setTrendingTestimonial(() =>
      getRandomUniqueElements(trendingTestimonialData, 5)
    );
  };

  useEffect(() => {
    fetchTrendingData();
    fetchTrendingTestimonialData();
  }, []);
  //console.log(trendingTestimonial);

  useEffect(() => {
    if (SwiperImageRef.current && SwiperTextRef.current) {
      let ImageSwiper = new Swiper(SwiperImageRef.current, {
        initialSlide: 0,
        effect: "cards",
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        centeredSlides: true,
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        },
        loop: true,
        modules: [Navigation, Autoplay, EffectCards],
        speed: 500,
        allowTouchMove: false,
        slidesPerView: "auto",

        cardsEffect: {
          rotate: false,
          slideShadows: false,
        },
      });
      let TextSwiper = new Swiper(SwiperTextRef.current, {
        initialSlide: 5,
        effect: "fade",
        autoplay: {
          delay: 4100,
          disableOnInteraction: false,
        },
        centeredSlides: true,
        loop: true,
        modules: [Autoplay, EffectFade, Navigation],
        speed: 500,
        allowTouchMove: false,
        slidesPerView: "auto",
        navigation: {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        },
      });

      return () => {
        ImageSwiper.destroy();
        TextSwiper.destroy();
      };
    }
  }, [SwiperImageRef.current, SwiperTextRef.current]);
  //console.log("fetchTrending ->", trending);
  //console.log("fetchTrendingTestimonial ->", trendingTestimonial);
  const getStarColor = (
    rating: string | undefined,
    starIndex: number
  ): string => {
    const ratingValue = rating ? parseInt(rating.split("-")[0]) : 0;
    return starIndex < ratingValue ? "#fd8f04" : "#1d1d1f";
  };

  return (
    <section id="testimonials">
      <div className="title-container">
        <BsStars size={40} />
        <h2>{trending?.testimonialName}</h2>
        <p>{trending?.testimonialSubtitle}</p>
        <Link href="/testimonials">View All</Link>
      </div>
      <div className="testimonials-container">
        {trendingTestimonial.length > 0 && (
          <>
            <div
              ref={SwiperImageRef}
              className="mySwiper-images swiper-container"
            >
              <div className="swiper-wrapper">
                {trendingTestimonial.map((data, index) => (
                  <div key={index} className="swiper-slide swiperSlide-card">
                    <Link href="#">
                      <Image
                        src={data?.cardImage}
                        alt="hero background"
                        fill
                        sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                      />
                    </Link>
                  </div>
                ))}
              </div>
              <div className="prev" ref={prevRef}>
                <div className="size">prev</div>
              </div>
              <div className="next" ref={nextRef}>
                <div className="size">next</div>
              </div>
            </div>
            <div
              ref={SwiperTextRef}
              className="mySwiper-content swiper-container"
            >
              <div className="swiper-wrapper">
                {trendingTestimonial.map((data, index) => (
                  <div key={index} className="swiper-slide swiperSlide-card">
                    <Link
                      className="title"
                      href={`/testimonials/${data.slug.current}`}
                    >
                      <h3>{data?.title}</h3>
                    </Link>
                    <div className="hashtags">
                      {data.hashtags?.map((data, index) => (
                        <p key={index}>#{data.name}</p>
                      ))}
                    </div>
                    <p className="shortReview">{data.shortReview}</p>
                    <div className="profile-container">
                      <div className="profile">
                        <div className="img-container">
                          {data.profile.image ? (
                            <Image
                              src={data.profile.image}
                              alt="hero background"
                              fill
                              sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                            />
                          ) : (
                            <h5>{data.profile.name.charAt(0)}</h5>
                          )}
                        </div>
                        <div className="profile-info">
                          <h4>{data.profile.name}</h4>
                          <p>
                            Reviewed on:
                            {data.reviewDate.toString()}
                          </p>
                        </div>
                      </div>
                      <div className="rating-container">
                        <div className="stars">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <AiFillStar
                              key={starIndex}
                              style={{
                                color: getStarColor(data.rating, starIndex),
                              }}
                            />
                          ))}
                        </div>
                        <p>Trip to {data.tripTo}</p>
                      </div>
                    </div>

                    <Link
                      className="button"
                      href={`/testimonials/${data.slug.current}`}
                    >
                      Read Full Story
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
