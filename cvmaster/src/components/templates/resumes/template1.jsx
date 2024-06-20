import Image from "next/image";
import React from "react";
import { ASSETS } from "../../../../assets";

export const Template1 = () => {
  return (
    <div className="shadow-xl shadow-black">
      <Image
        src={ASSETS.RESUME_TEMPLATE_1}
        className="h-full w-full"
        alt="first"
      />
    </div>
  );
};
