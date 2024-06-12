import Image from "next/image";
import { ASSETS } from "../../assets";

export const Footer = () => {
  return (
    <div className="bg-white border-t-[1px] border-b-[1px] border-dark-blue">
      <div className="container mx-auto ">
        <div className="flex justify-between py-4 items-center">
          <Image src={ASSETS.LOGO} />
          <p className="text-xl text-dark-blue font-popins font-medium">
            © {new Date().getFullYear()} CVMaker. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
