import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { brand } from "@/src/types/brand";
import { hero } from "@/src/types/hero";
import { heroInfo } from "@/src/types/heroInfo";
import { Country } from "@/src/types/country";

export async function getBrand(): Promise<brand[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "brand"] {
      _id,
      _createdAt,
      name,
      "headerImage": headerImage.asset->url,
      "darkImage": darkImage.asset->url,
      "lightImage": lightImage.asset->url,
      "logoMark": logoMark.asset->url
    }`
  );
}

export async function getHero(): Promise<hero[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "hero"] | order(_createdAt asc) {
      _id,
      _createdAt,
      title,
      country->{countryName,slug},
      "heroImage": heroImage.asset->url,
    }`
  );
}

export async function getHeroInfo(): Promise<heroInfo[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "heroInfo"] | order(_createdAt asc) {
      _id,
      _createdAt,
      subtitle,
      title,
      "icon": icon.asset->url,
    }`
  );
}

export async function getCountry(): Promise<Country[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "country"] | order(_createdAt asc) {
      _id,
      _createdAt,
      countryName,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "countryImages": countryImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "packages": *[_type == "packages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages" : packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
        },
        timeline,
        deal,
        price,
        priceSubtitle,
        aboutTheTour,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
            }
          }
        }
      },
    }`
  );
}
export async function getTradingCountries(): Promise<Country[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "country" && isTrending == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      countryName,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "countryImages": countryImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      isTrending,
      "packages": *[_type == "packages" && references(^._id)] | order(price desc){
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages" : packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
        },
        timeline,
        deal,
        price,
        priceSubtitle,
        aboutTheTour,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
            }
          }
        }
      },
    }`
  );
}

export async function getCountrySlug(slug: string): Promise<Country> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "country" && slug.current == $slug][0] {
      _id,
      _createdAt,
      countryName,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "countryImages": countryImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "packages": *[_type == "packages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages" : packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
        },
        timeline,
        deal,
        price,
        priceSubtitle,
        aboutTheTour,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
            }
          }
        }
      },
    }`,
    { slug }
  );
}
