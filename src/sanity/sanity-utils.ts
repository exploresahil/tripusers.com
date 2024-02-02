import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { brand } from "@/src/types/brand";
import { hero } from "@/src/types/hero";
import { heroInfo } from "@/src/types/heroInfo";

import { Domestic, DomesticPackages } from "../types/domestic";
import { international, internationalPackages } from "../types/international";
import { wildLife, wildlifePackage } from "../types/wildlife";

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
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
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
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
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
    { slug }
  );
}

export async function getInternationalPackagesSlug(
  slug: string
): Promise<internationalPackages> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "internationalPackages" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      place->{name, slug},
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
      },
    }`,
    { slug }
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
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
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
    }`
  );
}

//*------------------> Domestic

export async function getDomestic(): Promise<Domestic[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domestic" ] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
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
    }`
  );
}

export async function getDomesticSlug(slug: string): Promise<Domestic> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domestic" && slug.current == $slug][0]  {
      _id,
      _createdAt,
      name,
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
    { slug }
  );
}

export async function getDomesticPackagesSlug(
  slug: string
): Promise<DomesticPackages> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domesticPackages" && slug.current == $slug][0]  {
     _id,
      _createdAt,
      title,
      "slug": slug.current,
      place->{name, slug},
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
      },
    }`,
    { slug }
  );
}

export async function getTrendingDomestic(): Promise<Domestic[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domestic" && isTrending == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
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
    }`
  );
}

//*------------------> Wild Life

export async function getWildLife(): Promise<wildLife[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "wildlife"] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "wildlifePackage": *[_type == "WildLifePackage" && references(^._id)] {
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
    }`
  );
}

export async function getWildLifeSlug(slug: string): Promise<wildLife> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "wildlife" && slug.current == $slug][0]  {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
<<<<<<< HEAD
      "wildlifePackage": *[_type == "WildLifePackage" && references(^._id)] {
=======
      "wildlifePackage": *[_type == "wildLifePackage" && references(^._id)] {
>>>>>>> 45a8591c3eca4645421b8a160dc2a5c2f33f864b
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
    { slug }
  );
}

export async function getWildlifePackagesSlug(
  slug: string
): Promise<wildlifePackage> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "wildLifePackage" && slug.current == $slug][0]  {
    _id,
      _createdAt,
      title,
      "slug": slug.current,
      place->{name, slug},
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
      },
    }`,
    { slug }
  );
}

export async function getTrendingWildLife(): Promise<wildLife[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "wildlife" && isTrending == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      isTrending,
      "wildlifePackage": *[_type == "wildLifePackage" && references(^._id)] {
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
    }`
  );
}
