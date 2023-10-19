import Image from "next/image";
import logo from "../../../public/logo.png";

function Logo() {
  return (
    <div>
      <Image src={logo} alt="logo" width={60} className={"rounded-md"} />
    </div>
  );
}
export default Logo;
