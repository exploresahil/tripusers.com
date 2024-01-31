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
import gsap from "gsap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useGSAP } from "@gsap/react";

const HeroSection = () => {
  const [data, setData] = useState<hero[]>([]);
  const [dataInfo, setDataInfo] = useState<heroInfo[]>([]);
  const container = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<any>(null);
  const { contextSafe } = useGSAP({ scope: container });
  //const activeIndex = swiperRef.current;
  //const h2Elements = document.querySelectorAll("#heroSec .swiperSlide-card h2");

  useEffect(() => {
    async function fetchHero() {
      const data = await getHero();
      setData(data);
    }

    fetchHero();
  }, []);

  //console.log("link->", data);

  useEffect(() => {
    async function fetchHeroInfo() {
      const dataInfo = await getHeroInfo();
      setDataInfo(dataInfo);
    }

    fetchHeroInfo();
  }, []);

  const onSildeChange = contextSafe(() => {
    //------> Title Animation

    gsap.fromTo(
      ".swiper-slide-next div h2",
      { opacity: 0, scale: 5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power1.inOut",
      }
    );

    gsap.fromTo(
      ".swiper-slide-active div h2",
      {
        opacity: 1,
        scale: 1,
      },
      {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
      }
    );

    //------> Image Animation

    gsap.fromTo(
      ".swiper-slide-next div img",
      {
        scale: 1,
      },
      {
        scale: 1.2,
        duration: 2,
      }
    );

    //------> Paragraph Animation

    gsap.fromTo(
      ".swiper-slide-next div p",
      {
        y: -100,
      },
      {
        y: 0,
        duration: 0.4,
        ease: "power1.out",
      }
    );

    //------> Button Animation

    gsap.fromTo(
      ".swiper-slide-next div a",
      {
        scale: 0,
        opacity: 0,
        y: -100,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
      }
    );
  });

  return (
    <section id="heroSec" ref={container}>
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        //navigation={true}
        onSlideChange={onSildeChange}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
        speed={500}
        allowTouchMove={false}
        slidesPerView={1}
        ref={swiperRef}
      >
        <SwiperSlide className="swiperSlide-card">
          <div className="bg-container">
            <div className="bg" />
            <Image
              src={data[0]?.heroImage}
              alt="hero background"
              fill
              sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
            />
          </div>
          <div className="text-container">
            <p>{data[0]?.title}</p>
            <h2>{data[0]?.place.name}</h2>
            <Link href={`/international/${data[0]?.place.slug.current}`}>
              Read More
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide-card">
          <div className="bg-container">
            <div className="bg" />
            <Image
              src={data[1]?.heroImage}
              alt="hero background"
              fill
              sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
            />
          </div>
          <div className="text-container">
            <p>{data[1]?.title}</p>
            <h2>{data[1]?.place.name}</h2>
            <Link href={`/international/${data[1]?.place.slug.current}`}>
              Read More
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiperSlide-card">
          <div className="bg-container">
            <div className="bg" />
            <Image
              src={data[2]?.heroImage}
              alt="hero background"
              fill
              sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
            />
          </div>
          <div className="text-container">
            <p>{data[2]?.title}</p>
            <h2>{data[2]?.place.name}</h2>
            <Link href={`/international/${data[2]?.place.slug.current}`}>
              Read More
            </Link>
          </div>
        </SwiperSlide>
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
