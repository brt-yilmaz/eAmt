"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import React from "react";
import DE from "../../../public/german_flag.png";
import EN from "../../../public/united-kingdom_flag.png";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  function handleRoute() {
    if (locale === "en") {
      router.push(`/de${pathname.slice(3)}`);
    }
    if (locale === "de") {
      router.push(`/en${pathname}`);
    }
  }
  return (
    <div className="flex justify-end gap-3 shrink-0">
      <button onClick={() => handleRoute()}>
        <Image
          src={DE}
          alt="DE Flag"
          width={30}
          className="rounded-full aspect-square"
        />
      </button>
      <button onClick={() => handleRoute()}>
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