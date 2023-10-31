"use client";
import Image from "next/image";
import { Link } from "@/navigation";
import { useLocale } from "next-intl";
import React from "react";
import DE from "../../../public/german_flag.png";
import EN from "../../../public/united-kingdom_flag.png";

import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex justify-end gap-2 shrink-0">
      <button
        onClick={() => router.replace({ pathname, params }, { locale: "de" })}
      >
        <Image
          src={DE}
          alt="DE Flag"
          width={30}
          className="rounded-full aspect-square"
        />
      </button>

      <button
        onClick={() => router.replace({ pathname, params }, { locale: "en" })}
      >
        <Image
          src={EN}
          alt="EN Flag"
          width={30}
          className="rounded-full aspect-square"
        />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
