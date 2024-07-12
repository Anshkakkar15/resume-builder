import { useState } from "react";
import { CarouselItem } from "./ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import { nextStep } from "@/lib/getBuilderPage";
import Link from "next/link";

export const TemplateCard = ({ temlates }) => {
  const [isHovered, setHovered] = useState(false);
  return (
    // <CarouselItem

    //   className="md:basis-1/3.5 basis-1/2 p-2 sm:basis-1/3 md:basis-1/4"
    // >
    <div
      key={temlates.id}
      className="md:basis-1/3.5 basis-1/2 p-2 sm:basis-1/3 md:basis-1/4"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative border-[5px] border-dark-blue shadow-md shadow-black md:border-[9px] lg:border-[12px] 2xl:border-[15px] ${isHovered ? "tempelate-overlay" : ""}`}
      >
        <Image src={temlates.image} alt="resumes" className={`h-full w-full`} />
        <div className="absolute left-[50%] top-[50%] z-10 -translate-x-2/4 -translate-y-2/4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              translateY: isHovered ? "0" : "100%",
              opacity: isHovered ? 1 : 0,
            }}
            className="text-nowrap rounded-xl bg-light-blue px-3 py-2 text-sm font-semibold text-dark-blue"
            onClick={() => nextStep("introduction")}
          >
            <Link href={`/builder/introduction/${temlates.id}`}>
              Use Template
            </Link>
          </motion.button>
        </div>
      </div>
    </div>
    // </CarouselItem>
  );
};
