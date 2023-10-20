import Image from "next/image";
import logo from "../../../public/logo.png";

function Logo() {
  return (
    <div className={"w-14 shrink-0"}>
      <Image src={logo} alt="logo" width={50} className={"rounded-md"} />
    </div>
  );
}
export default Logo;
