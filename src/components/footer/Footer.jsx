import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTelegram
} from "react-icons/fa";

function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <div className="bg-bgFooter h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-17">
      <div className="p-5">
        <ul>
          <p className="text-gray-800 font-bold text-3xl pb-6">
          @<span className="text-blue-600">Amt</span>
          </p>
          <div className="flex gap-6 pb-5">
            <FaInstagram className="text-2xl w-7 h-7 cursor-pointer hover:text-pink-600" />
            <FaTwitter className="text-2xl w-7 h-7 cursor-pointer hover:text-blue-600" />
            <FaLinkedin className="text-2xl w-7 h-7 cursor-pointer hover:text-blue-600" />
            <FaYoutube className="text-2xl w-7 h-7 cursor-pointer hover:text-red-600" />
            <FaTelegram className="text-2xl w-7 h-7 cursor-pointer hover:text-blue-600" />
          </div>
        </ul>
      </div>

      <div className="p-5 hidden md:block">
        <ul>
          <p className="text-xl text-gray-800 font-bold text-2x1 pb-4">
            {t("products.title")}
          </p>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            {t("products.stocks")}
          </li>
         
          
        </ul>
      </div>

      <div className="p-5 hidden md:block">
        <ul>
          <p className="text-xl text-gray-800 font-bold text-2x1 pb-4">
            {t("company.title")}
          </p>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            <Link href={`/${locale}/about`}>
            {/* href={"/"+locale+"/about"} */}
              {t("company.about")}
            </Link>
            
          </li>
         
          
        </ul>
      </div>

      <div className="p-5">
        <ul>
          <p className="text-xl text-gray-800 font-bold text-2x1 pb-4">
            {t("support.title")}
          </p>
          <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
            {t("support.contact")}
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default Footer;
