"use client";
import "./style.scss";
import { getHero, getHeroInfo } from "@/sanity/sanity-utils";
import { hero } from "@/types/hero";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { heroInfo } from "@/types/heroInfo";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HeroSection = () => {
  const [data, setData] = useState<hero>([]);
  const [dataInfo, setDataInfo] = useState<heroInfo>([]);
  useEffect(() => {
    async function fetchHero() {
      const data = await getHero();
      setData(data);
    }

    fetchHero();
  }, []);

  console.log(data);

  useEffect(() => {
    async function fetchHeroInfo() {
      const dataInfo = await getHeroInfo();
      setDataInfo(dataInfo);
    }

    fetchHeroInfo();
  }, []);
  return (
    <section id="heroSec">
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        onSlideChange={() => console.log("slide change")}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
        speed={1200}
        allowTouchMove={false}
        slidesPerView={1}
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
              <p>{item.subtitle}</p>
              <h2>{item.title}</h2>
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
