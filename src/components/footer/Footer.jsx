import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="relative py-[120px] flex flex-col">
      <div className="background_gradient_tb absolute top-0 left-0 w-full h-[100px]" />
      <div className="background_gradient_bt absolute bottom-0 left-0 w-full h-[100px]" />

      <ul className="flex items-center justify-center gap-[15px] select-none >> md:gap-[30px]">
        <li className="text-[18px] font-[500] cursor-pointer hover:text-secondary transition-colors duration-300 md:text-[24px]">
          Terms Of Use
        </li>
        <li className="text-[18px] font-[500] cursor-pointer hover:text-secondary transition-colors duration-300 md:text-[24px]">
          Privacy-Policy
        </li>
        <li className="text-[18px] font-[500] cursor-pointer hover:text-secondary transition-colors duration-300 md:text-[24px]">
          About
        </li>
        <li className="text-[18px] font-[500] cursor-pointer hover:text-secondary transition-colors duration-300 md:text-[24px]">
          Blog
        </li>
        <li className="text-[18px] font-[500] cursor-pointer hover:text-secondary transition-colors duration-300 md:text-[24px]">
          FAQ
        </li>
      </ul>

      <p className="text-center max-w-[800px] text-gray-500 text-[16px] mx-auto my-[20px] md:text-[18px] md:my-[30px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        atque qui quis enim similique vel perspiciatis et tenetur sequi quasi?
        Amet placeat veritatis suscipit. Quos praesentium sed amet corrupti
        laborum.
      </p>

      <ul className="flex items-center justify-center gap-[20px]">
        <li className=" rounded-full bg-primary text-white cursor-pointer p-[10px] border-[2px] hover:border-[2px] hover:text-primary hover:border-primary hover:bg-transparent">
          <Link to="">
            <FaFacebookF />
          </Link>
        </li>
        <li className="rounded-full bg-primary text-white cursor-pointer p-[10px] border-[2px] hover:border-[2px] hover:text-primary hover:border-primary hover:bg-transparent">
          <Link to="">
            <FaInstagram />
          </Link>
        </li>
        <li className="rounded-full bg-primary text-white cursor-pointer p-[10px] border-[2px] hover:border-[2px] hover:text-primary hover:border-primary hover:bg-transparent">
          <Link to="">
            <FaTwitter />
          </Link>
        </li>
        <li className="rounded-full bg-primary text-white cursor-pointer p-[10px] border-[2px] hover:border-[2px] hover:text-primary hover:border-primary hover:bg-transparent">
          <Link to="">
            <FaLinkedin />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
