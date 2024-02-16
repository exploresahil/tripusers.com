"use client";

import { BiChevronDown } from "react-icons/bi";
import "./style.scss";
import PageLoading from "@/src/components/default/loader/PageLoading";
import { getInternationalPackagesSlug } from "@/src/sanity/sanity-utils";
import { internationalPackages } from "@/src/types/international";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { FaPlane } from "react-icons/fa";
import { FaPassport } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { RiHotelFill, RiLandscapeFill } from "react-icons/ri";
import { PortableText } from "@portabletext/react";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";
import SlugForm from "@/src/components/slugForm/SlugForm";

type Props = {
  params: {
    internationalPackages: string;
  };
};

const AccordionItem = ({ title, header, ...rest }: any) => (
  <Item
    className={"itinerary-accordion-item"}
    {...rest}
    header={
      <>
        <div className="day-title">
          <p>{header}</p>
          <h4>{title}</h4>
        </div>
        <BiChevronDown />
      </>
    }
    contentProps={{ className: "itinerary-accordion-item-content" }}
  />
);

const page = ({ params }: Props) => {
  const [data, setData] = useState<internationalPackages>();
  const [form, setForm] = useState<boolean>(false);

  const slug = params.internationalPackages;

  useEffect(() => {
    async function fetchInternationalPackageSlug() {
      try {
        const data = await getInternationalPackagesSlug(slug);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInternationalPackageSlug();
  }, [slug]);

  if (!data) {
    return <PageLoading />;
  }

  //console.log("internationalPackagesSlugData->", data);

  return (
    <>
      {form && (
        <SlugForm onClick={() => setForm(false)} packageName={data?.title} />
      )}
      <section id="internationalPackagesSlugHero">
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
          {data.packageImages &&
            data.packageImages.map((item, index) => (
              <SwiperSlide key={index} className="swiperSlide-card">
                <div className="bg-container">
                  <div className="bg" />
                  <Image
                    src={item.url}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1080px"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="text-container">
          <p>Your unforgettable trip</p>
          <h2>{data?.place.name}</h2>
        </div>
      </section>

      <section id="packageSection">
        <div className="title-container">
          <div className="text-container">
            <div className="title">
              <h2>{data?.title}</h2>
              <div className="tags">
                <p>{data?.timeline}</p>
                <Link href={`/international/${data?.place.slug.current}`}>
                  #{data?.place.name}
                </Link>
              </div>
            </div>
            <div className="icons">
              {data.addOns != null && (
                <>
                  {data.addOns.isHotels && <RiHotelFill />}
                  {data.addOns.isFood && <ImSpoonKnife />}
                  {data.addOns.isTransport && <FaBus />}
                  {data.addOns.isFlight && <FaPlane />}
                  {data.addOns.isSightseeing && <RiLandscapeFill />}
                  {data.addOns.isVisa && <FaPassport />}
                </>
              )}
            </div>
          </div>
          <div className="cta-container">
            <p className="deal">{data?.deal}</p>
            <h4>₹ {data?.price.toLocaleString("en-in")}</h4>
            <p>{data?.priceSubtitle}</p>
            <button onClick={() => setForm(true)}>Send Enquiry</button>
          </div>
        </div>
        <div className="package-container">
          <div className="about-package">
            <PortableText value={data.aboutTheTour} />
          </div>
          {data.inclusion && data.exclusion && (
            <div className="inclusion-exclusion">
              {data.inclusion && (
                <div className="inclusion">
                  <h3>Inclusion</h3>
                  <PortableText value={data.inclusion} />
                </div>
              )}
              {data.exclusion && (
                <div className="exclusion">
                  <h3>Exclusion</h3>
                  <PortableText value={data.exclusion} />
                </div>
              )}
            </div>
          )}

          <div className="itinerary">
            <h3 className="itinerary-title">Itinerary</h3>
            <Accordion className="itinerary-accordion">
              {data.itinerary &&
                data.itinerary.map((item, index) => (
                  <AccordionItem
                    key={index}
                    header={`Day ${item.day} `}
                    title={item.title}
                    initialEntered={index === 0}
                  >
                    <div className="desc">
                      {item.description && (
                        <PortableText value={item.description} />
                      )}
                    </div>
                    {item.content &&
                      item.content.map((content, index) => (
                        <div key={index} className="content">
                          <h4>{content.title}</h4>

                          {content.description && (
                            <PortableText value={content.description} />
                          )}

                          {content.images && (
                            <div className="images-container">
                              {content.images.map((img, index) => (
                                <div key={index} className="img-container">
                                  <Image
                                    src={img.url}
                                    alt="hero background"
                                    fill
                                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1080px"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
