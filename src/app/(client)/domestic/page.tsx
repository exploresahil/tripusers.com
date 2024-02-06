"use client";

import SwiperHero from "@/src/components/international/Swiper";
import { getDomestic, getInternational } from "@/src/sanity/sanity-utils";
import "@/src/app/(client)/international/style.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Domestic } from "@/src/types/domestic";
import PageLoading from "@/src/components/default/loader/PageLoading";

const page = () => {
  const [domestic, setDomestic] = useState<Domestic[]>();

  useEffect(() => {
    const fetchDomestic = async () => {
      const domesticData = await getDomestic();
      setDomestic(domesticData);
    };
    fetchDomestic();
  }, []);

  //console.log("InternationalData->", InternationalData);

  if (!domestic) {
    return <PageLoading />;
  }

  return (
    <>
      {domestic && <SwiperHero title="India" data={domestic} />}
      <section id="internationalPage">
        <div className="grid">
          {domestic?.map((data, index) => (
            <Link
              href={`/domestic/${data.slug}`}
              key={index}
              className="child-container"
            >
              <div className="img-container">
                {data?.cardImage && (
                  <Image
                    src={data.cardImage}
                    alt="hero background"
                    fill
                    sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
                  />
                )}
              </div>
              <div className="cta-container">
                <div className="text-container">
                  <h3>{data.name}</h3>
                  {data.domesticPackages && (
                    <p>
                      Starts from{" "}
                      {data.domesticPackages.length == 0
                        ? 1500
                        : data?.domesticPackages[0].price.toLocaleString(
                            "en-IN"
                          )}
                    </p>
                  )}
                </div>
                <button>View Details</button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
