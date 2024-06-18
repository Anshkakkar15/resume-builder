import Image from "next/image";
import { ASSETS } from "../../assets";

export const Footer = () => {
  return (
    <div className="mt-5 border-b-[1px] border-t-[1px] border-dark-blue bg-white">
      <div className="container mx-auto px-3 sm:px-5 md:px-7 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-y-3 py-3 sm:py-4">
          <div className="max-w-28 sm:max-w-32 2xl:w-full">
            <Image src={ASSETS.LOGO} alt="logo" />
          </div>
          <p className="text-center font-popins text-sm font-medium text-dark-blue sm:text-base lg:text-xl">
            © {new Date().getFullYear()} CVMaker. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
