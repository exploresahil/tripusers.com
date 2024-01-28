import { getTrendingCountries } from "@/src/sanity/sanity-utils";
import "./style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

const Trending = async () => {
  const trendingData = await getTrendingCountries();

  //console.log(trendingData);

  return (
    <section id="trending">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>Trending Destination</h2>
        <p>These popular destination have a lot to offer</p>
      </div>
      <div className="trending-grid">
        {trendingData.map((item, index) => (
          <Link href={`/country/${item.slug}`} key={index} className="country">
            {item.cardImage && (
              <Image
                src={item.cardImage}
                alt={`image of  ${item.countryName}`}
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
            )}
            <div className="text-container">
              <h3>{item.countryName}</h3>
              <p>
                Starts from{" "}
                {item.packages.length == 0 ? 1500 : item.packages[0]?.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Trending;
