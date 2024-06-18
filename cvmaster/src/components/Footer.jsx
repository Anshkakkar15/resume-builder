"use client";
import Image from "next/image";
import { ASSETS } from "../../assets";
import { animated, useSpring } from "@react-spring/web";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      leave: { opacity: 0 },
      config: { duration: 1000 },
    }),
    [pathname],
  );
  return (
    <animated.div
      style={props}
      className="my-5 border-b-[1px] border-t-[1px] border-dark-blue bg-white"
    >
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
    </animated.div>
  );
};
