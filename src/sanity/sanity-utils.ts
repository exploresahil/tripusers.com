import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { brand } from "@/src/types/brand";
import { hero } from "@/src/types/hero";
import { heroInfo } from "@/src/types/heroInfo";

import { Domestic } from "../types/domestic";
import { international } from "../types/international";

//*------------------> Brand

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

//*------------------> Hero Section

export async function getHero(): Promise<hero[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "hero"] | order(_createdAt asc) {
       _id,
      _createdAt,
      title,
      place->{name, slug},
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

//*------------------> International

export async function getInternational(): Promise<international[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international"] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "InternationalPackages": *[_type == "InternationalPackages" && references(^._id)] {
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

export async function getInternationalSlug(
  slug: string
): Promise<international> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international" && slug.current == $slug][0] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "InternationalPackages": *[_type == "InternationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
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
    { slug } // Pass parameters here if needed
  );
}

export async function getTrendingInternational(): Promise<international[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international" && isTrending == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "bannerImages": countryImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      isTrending,
      "InternationalPackages": *[_type == "InternationalPackages" && references(^._id)] | order(price asc){
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

//*------------------> Domestic

export async function getDomestic(): Promise<Domestic[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domestic"] | order(_createdAt asc) {
      _id,
      _createdAt,
      stateName,
      isTrending,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "domesticPackages": *[_type == "domesticPackages" && references(^._id)] {
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
