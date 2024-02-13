"use client";

import { BsStars } from "react-icons/bs";
import { useEffect, useState } from "react";
import "./style.scss";
import { trending } from "@/src/types/trending";
import { getTrending } from "@/src/sanity/sanity-utils";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectCoverflow,
  EffectCards,
} from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";

const Testimonials = () => {
  const [trending, setTrending] = useState<trending>();

  const fetchTrending = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  //console.log("fetchTrending ->", trending);

  return (
    <section id="testimonials">
      <div className="title-container">
        <BsStars size={40} />
        <h2>{trending?.testimonialName}</h2>
        <p>{trending?.testimonialSubtitle}</p>
        <Link href="/domestic">View All</Link>
      </div>

      <div className="testimonials-container">
        <Swiper
          effect={"cards"}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          navigation={true}
          loop={true}
          modules={[Navigation, Autoplay, EffectCoverflow, EffectCards]}
          className="mySwiper-images"
          speed={500}
          allowTouchMove={false}
          slidesPerView={"auto"}
          cardsEffect={{
            rotate: false,
            slideShadows: false,
          }}
        >
          <SwiperSlide className="swiperSlide-card">
            <Link href="#">
              <Image
                src="https://images.unsplash.com/photo-1707156215707-28f20d316b2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="hero background"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="swiperSlide-card">
            <Link href="#">
              <Image
                src="https://images.unsplash.com/photo-1707156215707-28f20d316b2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="hero background"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="swiperSlide-card">
            <Link href="#">
              <Image
                src="https://images.unsplash.com/photo-1707156215707-28f20d316b2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="hero background"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="swiperSlide-card">
            <Link href="#">
              <Image
                src="https://images.unsplash.com/photo-1707156215707-28f20d316b2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="hero background"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            </Link>
          </SwiperSlide>
          <SwiperSlide className="swiperSlide-card">
            <Link href="#">
              <Image
                src="https://images.unsplash.com/photo-1707156215707-28f20d316b2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt="hero background"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
