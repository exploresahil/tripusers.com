import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { brand } from "@/types/brand";
import { hero } from "@/types/hero";
import { heroInfo } from "@/types/heroInfo";
import { packages } from "@/types/packages";

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

export async function getHero(): Promise<hero> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "hero"] | order(_createdAt asc) {
      _id,
      _createdAt,
      subtitle,
      title,
      "heroImage": heroImage.asset->url,
    }`
  );
}

export async function getHeroInfo(): Promise<heroInfo> {
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

export async function getPackages(): Promise<packages> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "packages"] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "country": {
        "_id": country->_id,
        "slug": slug.current,
        "_createdAt": country->_createdAt,
        "countryName": country->countryName,
        "cardImage": country->cardImage.asset->url,
        "countryImages": country->countryImages[] {
        "_id": asset->_id,
        "url": asset->url,
        }
      },
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
    }`
  );
}
