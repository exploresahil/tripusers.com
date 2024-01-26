"use client";

import Image from "next/image";
import "./style.scss";
import { getHero, getHeroInfo } from "@/sanity/sanity-utils";
import { useEffect, useState } from "react";
import { hero } from "@/types/hero";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { heroInfo } from "@/types/heroInfo";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const [heroData, setHeroData] = useState<hero>([]);
  const [heroInfoData, setHeroInfoData] = useState<heroInfo>([]);

  useEffect(() => {
    async function fetchHero() {
      const data = await getHero();
      setHeroData(data);
    }

    async function fetchHeroInfo() {
      const infoData = await getHeroInfo();
      setHeroInfoData(infoData);
    }
    fetchHeroInfo();
    fetchHero();
  }, []);

  return (
    <section id="hero">
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={() => console.log("slide change")}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
        speed={1200}
      >
        {heroData.map((item, index) => (
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
              <p>{item.subtitle}</p>
              <h2>{item.title}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="info-container">
        {heroInfoData.map((item, index) => (
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

export default Hero;
