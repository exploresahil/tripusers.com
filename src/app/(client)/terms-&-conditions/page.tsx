"use client";

import React, { useEffect, useState } from "react";
import "@/src/app/(client)/privacy-policy/style.scss";
import { PrivacyPolicyAndTnc } from "@/src/types/privacyPolicyAndTnc";
import { getPrivacyPolicyAndTnc } from "@/src/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

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
          <h2>{privacyPolicyAndTnc?.termsAndConditions.title}</h2>
          <p>{privacyPolicyAndTnc?.termsAndConditions.updatedAt}</p>
        </div>
        <div className="img-container">
          {privacyPolicyAndTnc?.termsAndConditions.bannerImage && (
            <>
              <Image
                src={privacyPolicyAndTnc?.termsAndConditions.bannerImage}
                alt="contact hero image"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 800px, 1080px"
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="privacyPolicyContent">
        <h2>{privacyPolicyAndTnc?.termsAndConditions.title}</h2>
        <span>
          Last updated: {privacyPolicyAndTnc?.termsAndConditions.updatedAt}
        </span>
        {privacyPolicyAndTnc?.privacyPolicy.content && (
          <PortableText
            value={privacyPolicyAndTnc?.termsAndConditions.content}
          />
        )}
      </section>
    </>
  );
};

export default page;
