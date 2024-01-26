import "./style.scss";
import { getBrand } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";

const Header = async () => {
  const brand = await getBrand();
  const logo = brand[0].headerImage;
  const logoMark = brand[0].logoMark;

  return (
    <header>
      <Link href="/" className="logo-container">
        <Image
          src={logo}
          alt="tripusers.com logo"
          fill
          sizes="(max-width: 768px) 600px, (max-width: 1200px) 1000px, 2000px"
        />
      </Link>
      <Menu logo={logoMark} />
    </header>
  );
};

export default Header;
