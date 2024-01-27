"use client";
import "./style.scss";
import { getHero, getHeroInfo } from "@/src/sanity/sanity-utils";
import { hero } from "@/src/types/hero";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { heroInfo } from "@/src/types/heroInfo";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [data, setData] = useState<hero>([]);
  const [dataInfo, setDataInfo] = useState<heroInfo>([]);
  const container = useRef<HTMLSelectElement | null>(null);
  const swiperRef = useRef<any>(null);
  const { contextSafe } = useGSAP({ scope: container });
  const router = useRouter();

  useEffect(() => {
    async function fetchHero() {
      const data = await getHero();
      setData(data);
    }

    fetchHero();
  }, []);

  //console.log(data);

  useEffect(() => {
    async function fetchHeroInfo() {
      const dataInfo = await getHeroInfo();
      setDataInfo(dataInfo);
    }

    fetchHeroInfo();
  }, []);

  const onSildeChange = contextSafe(() => {
    const currentIndex = swiperRef.current?.swiper.realIndex || 0;
    const totalSlides = swiperRef.current?.swiper.slides.length || 1;
    console.log("currentIndex->", currentIndex);
    console.log("totalSlides->", totalSlides);
  });

  return (
    <section id="heroSec">
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        //navigation={true}
        onSlideChange={onSildeChange}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
        speed={1200}
        allowTouchMove={false}
        slidesPerView={1}
        ref={swiperRef}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="swiperSlide-card">
            <div className="bg-container">
              <div className="bg" />
              <Image
                src={item.heroImage}
                alt="hero background"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            </div>
            <div className="text-container">
              <p>{item.title}</p>
              <h2>{item.country.countryName}</h2>
              <button
                onClick={() => {
                  router.push(`/country/${item.country.slug}`);
                }}
              >
                Read More
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="info-container">
        {dataInfo.map((item, index) => (
          <div key={index} className="info">
            <Image src={item.icon} alt="icon" width={20} height={20} />
            <p>
              {item.title}
              <span>{item.subtitle}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
