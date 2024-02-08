import Image from "next/image";
import "./style.scss";

const page = () => {
  return (
    <section id="about">
      {/* <section id="contactHero">
        <div className="titel-container">
          <h2>Contact</h2>
          <p>Where Luxury Meets Authenticity in Every Travel Experience</p>
        </div>
        <div className="img-container">
          {contact?.bannerImage && (
            <>
              <Image
                src={contact?.bannerImage}
                alt="contact hero image"
                fill
                sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section> */}
    </section>
  );
};

export default page;
