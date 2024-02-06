import { getTrending } from "@/src/sanity/sanity-utils";

import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { createClient, groq } from "next-sanity";
import clientConfig from "@/src/sanity/config/client-config";
import { international } from "@/src/types/international";
function getTrendingHomeInternational(): Promise<international[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international" && isTrendingHome == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      isTrending,
      isTrendingHome,
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        price,
      },
    }`,
    {
      next: {
        revalidate: 60, // look for updates to revalidate cache every hour
      },
    }
  );
}
const Trending = async () => {
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
        {trendingData.map((item, index) => (
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
