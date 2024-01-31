import { MdEmail } from "react-icons/md";
import "./style.scss";
import Image from "next/image";
import BGImage from "@/src/public/assets/contact-us-bg.svg";
import { BiPhoneCall } from "react-icons/bi";
const ContactUs = () => {
  return (
    <section className="container">
      <div className="form">
        <div className="header">
          <h1>Contact Us today</h1>
          <div className="info-con">
            <div className="icon">
              <BiPhoneCall />
              <p>call</p>
            </div>
            <div className="info">
              <p>+91 88888 00696</p>
            </div>
          </div>
          <div className="info-con">
            <div className="icon">
              <MdEmail />
              <p>email</p>
            </div>
            <div className="info">
              <p>paragkoche0@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="body">
          <form>
            <label>Want us to call you?</label>
            <div className="input-cont">
              <input placeholder="Name" />
              <input placeholder="phone number" />
            </div>
            <button>
              <BiPhoneCall />
              Request Call Back
            </button>
          </form>
        </div>
      </div>
      <div className="bg">
        <Image src={BGImage} alt="contact-us bg image" />
      </div>
    </section>
  );
};

export default ContactUs;
