import Image from "next/image";
import "./style.scss";
import { getContactUsInfo } from "@/src/sanity/sanity-utils";
import Form from "@/src/components/contact/Form";
import { PortableText } from "@portabletext/react";

const Contact = async () => {
  const contactData = await getContactUsInfo();
  console.log("contactData-->", contactData.offices);

  return (
    <>
      <section id="contactHero">
        <div className="titel-container">
          <h2>{contactData.title}</h2>
          <p>{contactData.subtitle}</p>
        </div>
        <div className="img-container">
          {contactData.bannerImage && (
            <>
              <Image
                src={contactData?.bannerImage}
                alt="contact hero image"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="contact">
        <h4>{contactData.formInfo}</h4>
        <div className="form-container">
          <Form />
          <div className="info">
            <div className="address">
              <h5>Address</h5>
              <PortableText value={contactData?.Address} />
            </div>
            <div className="email">
              <h5>Email</h5>
              <p>{contactData.email}</p>
            </div>
            <div className="phone">
              <h5>Phone</h5>
              <p>{contactData.phone}</p>
            </div>
          </div>
        </div>
        <div className="offices-container">
          <div className="title">
            <h3>Our Offices</h3>
            <p>{contactData.ourOfficesSubtitle}</p>
          </div>
          <div className="grid">
            {contactData.offices.map((data, index) => (
              <div key={index} className="item">
                <h5>{data.place}</h5>
                <PortableText value={data.Address} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
