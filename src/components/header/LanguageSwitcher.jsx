import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import DE from "../../../public/german_flag.png";
import EN from "../../../public/united-kingdom_flag.png";


const LanguageSwitcher = () => {
  return (
    <div className="flex justify-end gap-2 shrink-0">
      <Link href={`/de`}>
        <Image
          src={DE}
          alt="DE Flag"
          width={30}
          className="rounded-full aspect-square"
        />
      </Link>

      <Link href="/en">
        <Image
          src={EN}
          alt="EN Flag"
          width={30}
          className={"rounded-full aspect-square"}
        />
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
