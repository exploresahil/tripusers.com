"use client";

import { BsBookmarkStarFill } from "react-icons/bs";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCards } from "swiper/modules";

import { useEffect, useState } from "react";
import { special } from "@/src/types/special";
import { getSpecial, getTrending } from "@/src/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import { trending } from "@/src/types/trending";

const SpecialPackages = () => {
  const [specialData, setSpecialData] = useState<special[]>();
  const [trending, setTrending] = useState<trending>();
  const fetchSpecial = async () => {
    const data = await getSpecial();
    setSpecialData(data);
  };

  const fetchTrending = async () => {
    const data = await getTrending();
    setTrending(data);
  };

  useEffect(() => {
    fetchSpecial();
    fetchTrending();
  }, []);

  //console.log("specialData->", specialData);

  return (
    <section id="specialPackages">
      {specialData && (
        <>
          <div className="title-container">
            <BsBookmarkStarFill />
            <h2>{trending?.specialName}</h2>
          </div>
          <Swiper
            effect={"cards"}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={true}
            loop={true}
            modules={[Navigation, Autoplay, EffectCards]}
            className="mySwiper"
            speed={500}
            allowTouchMove={false}
            slidesPerView={1}
            cardsEffect={{
              perSlideRotate: 2,
              perSlideOffset: 6,
            }}
          >
            {specialData.map((item, index) => (
              <SwiperSlide key={index} className="swiperSlide-card">
                <Link href={`/special/${item.slug}`} className="bg-container">
                  <Image
                    src={item.cardImage}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                  />

                  <div className="text-container">
                    <div className="title">
                      <h2>{item.cardTitle}</h2>
                      <p>{item.cardSubtitle}</p>
                    </div>
                    <Link href={`/special/${item.slug}`}>Learn More</Link>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
};

export default SpecialPackages;
