"use client";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";

import { MdEmail } from "react-icons/md";
import "./style.scss";
import Image from "next/image";
import BGImage from "@/src/public/assets/contact-us-bg.svg";
import { BiPhoneCall } from "react-icons/bi";
import { useState } from "react";
const ContactUs = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(
      "https://script.google.com/macros/s/AKfycbysvpPeuHRGHaG3qIdLSk_vdv52AhxzE4sOqo34SCSqMDArxgJqPNEVkRWG4KzjMhAg/exec?action=addData",
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          phone_number: phoneNumber,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Data successfully submitted!");
          alert("Data successfully submitted!");
        } else {
          console.error("Failed to submit data");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <section className="container">
      <div className="form">
        <div className="header">
          <h1>Contact Us today</h1>
          <div className="info-con">
            <div className="icon">
              <AiFillPhone />
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
          <form onSubmit={handleSubmit}>
            <label>Want us to call you?</label>
            <div className="input-cont">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="submit">
              <BsFillTelephoneFill />
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
