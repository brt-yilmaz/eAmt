import Image from "next/image";
import Link from "next/link";
import React from "react";
import DE from "../../../public/german_flag.png";
import EN from "../../../public/united-kingdom_flag.png";

const LanguageSwitcher = () => {
  return (
    <div className="flex justify-end gap-2 ">
      <Link href="/de" locale="de">
        <Image
          src={DE}
          alt="DE Flag"
          width={36}
          className="rounded-full aspect-square"
        />
      </Link>

      <Link href="/en" locale="en">
        <Image
          src={EN}
          alt="EN Flag"
          width={35}
          className={"rounded-full aspect-square"}
        />
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
