import Image from "next/image";
import "./pageLoading.scss";

const logo =
  "https://i.postimg.cc/X7BSCsqN/tripusers-com-Logo-Iconsahil-low.png";

const PageLoading = () => {
  return (
    <section id="PageLoading">
      <div className="img-container">
        <Image
          src={logo}
          alt="logo"
          fill
          sizes="(max-width: 768px) 80px, (max-width: 1200px) 80px, 80px"
        />
      </div>
      <div className="loader-container">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
      <p>LOADING</p>
    </section>
  );
};

export default PageLoading;
