"use client";
import Image from "next/image";

import { ASSETS } from "../../assets";
import { timeline } from "../../mock/Timeline";

export const BuilderTopbar = () => {
  return (
    <div className="w-full bg-dark-blue shadow-md">
      <div className="container mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 lg:px-8">
        <div className="">
          <Image src={ASSETS.ICON} alt="icon" className="w-10" />
        </div>
      </div>
    </div>
  );
};
