"use client";

import { FaCarAlt } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { FaPassport } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { RiHotelFill, RiLandscapeFill } from "react-icons/ri";

import { getInternationalSlug } from "@/src/sanity/sanity-utils";
import { international } from "@/src/types/international";
import { useEffect, useState } from "react";
import "./style.scss";
import PageLoading from "@/src/components/default/loader/PageLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import Image from "next/image";
import Link from "next/link";
import CustomiseForm from "@/src/components/forms/CustomiseForm";
import ImageSize from "@/src/utils/image-utils";
import SlugForm from "@/src/components/slugForm/SlugForm";
import iconsData from "@/src/utils/icons-utils";

type Props = {
  params: { international: string };
};

const page = ({ params }: Props) => {
  const [data, setData] = useState<international>();
  const [mobileForm, setMobileForm] = useState(false);
  const [packageName, setPackageName] = useState("");
  const slug = params.international;

  useEffect(() => {
    async function fetchInternationalSlug() {
      try {
        const data = await getInternationalSlug(slug);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInternationalSlug();
  }, [slug]);

  //console.log("internationalSlugData->", data);

  if (!data) {
    return <PageLoading />;
  }

  return (
    <>
      {mobileForm && (
        <SlugForm
          packageName={packageName}
          onClick={() => setMobileForm(false)}
        />
      )}
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
                  sizes={ImageSize.bannerSizes}
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
        <h2 className="place-title">{data.name} Packages</h2>
        <div className="packages-container">
          {data.internationalPackages.length != 0 ? (
            <>
              {data.internationalPackages.map((item, index) => (
                <div key={index} className="package">
                  <div className="package-swiper-container">
                    <Swiper
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                      }}
                      navigation={true}
                      //onSlideChange={onSildeChange}
                      loop={true}
                      modules={[Navigation, Autoplay]}
                      className="mySwiper"
                      speed={500}
                      allowTouchMove={false}
                      slidesPerView={1}
                    >
                      {item.packageImages &&
                        item.packageImages.map((item, index) => (
                          <SwiperSlide key={index} className="swiperSlide-card">
                            <div className="bg-container">
                              <Image
                                src={item.url}
                                alt="hero background"
                                fill
                                sizes={ImageSize.cardSize}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                  <div className="text-container">
                    <div className="title">
                      <Link href={`/international/${data.slug}/${item.slug}`}>
                        <h3>{item.title}</h3>
                      </Link>
                      <p>{item.timeline}</p>
                    </div>
                    <div className="icons">
                      {item.addOns != null && (
                        <>
                          {item.addOns.isHotels && (
                            <span>
                              <RiHotelFill />
                              <p>{iconsData.hotels}</p>
                            </span>
                          )}
                          {item.addOns.isFood && (
                            <span>
                              <ImSpoonKnife />
                              <p>{iconsData.food}</p>
                            </span>
                          )}
                          {item.addOns.isTransport && (
                            <span>
                              <FaCarAlt />
                              <p>{iconsData.transport}</p>
                            </span>
                          )}
                          {item.addOns.isFlight && (
                            <span>
                              <FaPlane />
                              <p>{iconsData.flight}</p>
                            </span>
                          )}
                          {item.addOns.isSightseeing && (
                            <span>
                              <RiLandscapeFill />
                              <p>{iconsData.sightseeing}</p>
                            </span>
                          )}
                          {item.addOns.isVisa && (
                            <span>
                              <FaPassport />
                              <p>{iconsData.visas}</p>
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="line" />
                  <div className="cta-container">
                    <div className="price-container">
                      <p className="deal">{item.deal}</p>
                      <div className="price">
                        <p>Starts from</p>
                        <h4>₹ {item.price.toLocaleString("en-in")}</h4>
                        <p>{item.priceSubtitle}</p>
                      </div>
                    </div>
                    <div className="links">
                      <Link href={`/international/${data.slug}/${item.slug}`}>
                        View Details
                      </Link>
                      <button
                        onClick={() => {
                          setPackageName(item.title);
                          setMobileForm(true);
                        }}
                      >
                        Quick Enquiry
                      </button>
                    </div>
                  </div>
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
