"use client";

import { getBrand, getInternationalSlug } from "@/src/sanity/sanity-utils";
import { international } from "@/src/types/international";
import { useEffect, useState } from "react";
import "./style.scss";
import { brand } from "@/src/types/brand";
import PageLoading from "@/src/components/default/loader/PageLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";

type Props = {
  params: { international: string };
};

const page = ({ params }: Props) => {
  const [data, setData] = useState<international>();
  const slug = params.international;

  useEffect(() => {
    async function fetchCountrySlug() {
      try {
        const data = await getInternationalSlug(slug);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCountrySlug();
  }, [slug]);

  //console.log("internationalSlugData->", data);

  if (!data) {
    return <PageLoading />;
  }

  return (
    <>
      <section id="internationalSlugHero">
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
          {data.bannerImages.map((item, index) => (
            <SwiperSlide key={index} className="swiperSlide-card">
              <div className="bg-container">
                <div className="bg" />
                <Image
                  src={item.url}
                  alt="hero background"
                  fill
                  sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-container">
          <p>Your unforgettable trip</p>
          <h2>{data?.name}</h2>
        </div>
      </section>
      <section id="packages">
        <h2>{data.name} Packages</h2>
        <div className="packages-container">
          {data.internationalPackages ? (
            <>
              {data.internationalPackages.map((item, index) => (
                <div key={index} className="package">
                  <h3>{item.title}</h3>
                  <p>{item.price.toLocaleString("en-in")}</p>
                </div>
              ))}
            </>
          ) : (
            <p>No Packages Found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
