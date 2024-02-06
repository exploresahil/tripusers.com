import { getTrending } from "@/src/sanity/sanity-utils";

import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { createClient, groq } from "next-sanity";
import clientConfig from "@/src/sanity/config/client-config";
import { international } from "@/src/types/international";

const Trending = async () => {
  async function getTrendingHomeInternational() {
    return await fetch(
      `https://ftydbt8w.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22international%22+%26%26+isTrendingHome+%3D%3D+true%5D+%7C+order%28_createdAt+asc%29+%7B%0A++++++_id%2C%0A++++++_createdAt%2C%0A++++++name%2C%0A++++++%22slug%22%3A+slug.current%2C%0A++++++%22cardImage%22%3A+cardImage.asset-%3Eurl%2C%0A++++++isTrending%2C%0A++++++isTrendingHome%2C%0A++++++%22internationalPackages%22%3A+*%5B_type+%3D%3D+%22internationalPackages%22+%26%26+references%28%5E._id%29%5D+%7B%0A++++++++_id%2C%0A++++++++_createdAt%2C%0A++++++++title%2C%0A++++++++price%2C%0A++++++%7D%2C%0A++++%7D&tag=sanity.studio.vision`,
      {
        next: {
          revalidate: 60, // look for updates to revalidate cache every hour
        },
        cache: "no-store",
      }
    ).then((res) => res.json());
  }
  const trendingData = await getTrendingHomeInternational();
  const trending = await getTrending();

  //console.log("Trending->", trendingData);

  return (
    <section id="trending">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending.internationalName}</h2>
        <p>{trending.internationalSubtitle}</p>
        <Link href="/international/trending">View All</Link>
      </div>
      <div className="trending-grid">
        {trendingData.map((item: any, index: any) => (
          <Link
            href={`/international/${item.slug}`}
            key={index}
            className="country"
          >
            {item.cardImage && (
              <Image
                src={item.cardImage}
                alt={`image of  ${item.name}`}
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            )}
            <div className="text-container">
              <h3>{item.name}</h3>
              {item.internationalPackages && (
                <p>
                  Starts from{" "}
                  {item.internationalPackages.length == 0
                    ? 1500
                    : item.internationalPackages[0].price.toLocaleString(
                        "en-IN"
                      )}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Trending;

export const dynamic = "force-dynamic";
