"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import { PrivacyPolicyAndTnc } from "@/src/types/privacyPolicyAndTnc";
import { getPrivacyPolicyAndTnc } from "@/src/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import ImageSize from "@/src/utils/image-utils";

const page = () => {
  const [privacyPolicyAndTnc, setPrivacyPolicyAndTnc] =
    useState<PrivacyPolicyAndTnc>();

  const fetchPrivacyPolicyAndTnc = async () => {
    const data = await getPrivacyPolicyAndTnc();
    setPrivacyPolicyAndTnc(data);
  };
  useEffect(() => {
    fetchPrivacyPolicyAndTnc();
  }, []);

  //console.log("privacyPolicyAndTncData ->", privacyPolicyAndTnc);

  return (
    <>
      <section id="privacyPolicyHeader">
        <div className="titel-container">
          <h2>{privacyPolicyAndTnc?.privacyPolicy.title}</h2>
          <p>{privacyPolicyAndTnc?.privacyPolicy.updatedAt}</p>
        </div>
        <div className="img-container">
          {privacyPolicyAndTnc?.privacyPolicy.bannerImage && (
            <>
              <Image
                src={privacyPolicyAndTnc?.privacyPolicy.bannerImage}
                alt="contact hero image"
                fill
                sizes={ImageSize.bannerSizes}
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="privacyPolicyContent">
        <h2>{privacyPolicyAndTnc?.privacyPolicy.title}</h2>
        <span>
          Last updated: {privacyPolicyAndTnc?.privacyPolicy.updatedAt}
        </span>
        {privacyPolicyAndTnc?.privacyPolicy.content && (
          <PortableText value={privacyPolicyAndTnc?.privacyPolicy.content} />
        )}
      </section>
    </>
  );
};

export default page;
