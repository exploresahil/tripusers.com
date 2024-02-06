"use client";

import SwiperHero from "@/src/components/international/Swiper";
import { getInternational } from "@/src/sanity/sanity-utils";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { international } from "@/src/types/international";
import PageLoading from "@/src/components/default/loader/PageLoading";

const page = () => {
  const [international, setInternational] = useState<international[]>();

  useEffect(() => {
    const fetchInternational = async () => {
      const InternationalData = await getInternational();
      setInternational(InternationalData);
    };
    fetchInternational();
  }, []);
  //console.log("InternationalData->", InternationalData);

  if (!international) {
    return <PageLoading />;
  }

  return (
    <>
      {international && (
        <SwiperHero title="International" data={international} />
      )}
      <section id="internationalPage">
        <div className="grid">
          {international?.map((data, index) => (
            <Link
              href={`/international/${data.slug}`}
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
                  {data.internationalPackages && (
                    <p>
                      Starts from{" "}
                      {data.internationalPackages.length == 0
                        ? 1500
                        : data?.internationalPackages[0].price.toLocaleString(
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
