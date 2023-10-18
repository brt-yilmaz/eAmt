import Image from "next/image";
import Link from "next/link";
import React from "react";
import DE from "../../../public/free-icon-german-5988791.png"
import EN from "../../../public/united-kingdom.png"



const LanguageSwitcher = () => {
  return (
   <div className="flex justify-end -translate-y-20 translate-x-87 w-full">
    <Link href='/de' locale='de'>
      <Image 
            src={DE}
            alt="DE Flag"
            width={35}
            height={35}
            className="sm:mr-10 md:mr-1 mt-[-2] sm:mt-[-1]"
            
            />
    </Link>

    <Link href='/en' locale='en'>
      <Image 
            src={EN}
            alt="EN Flag"
            width={36}
            height={35}
            />
    </Link>
   </div>
  );
};

export default LanguageSwitcher;