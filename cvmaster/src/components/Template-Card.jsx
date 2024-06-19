import { useState } from "react";
import { CarouselItem } from "./ui/carousel";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const TemplateCard = ({ temlates }) => {
  const [isHovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <CarouselItem
      key={temlates.id}
      className="md:basis-1/3.5 basis-1/2 sm:basis-1/3 md:basis-1/4 2xl:basis-1/5"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative shadow-md shadow-black ${isHovered ? "tempelate-overlay" : ""}`}
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
            onClick={() => router.push(`/build/introduction/${temlates.id}`)}
            className="text-nowrap rounded-xl bg-light-blue px-3 py-2 text-sm font-semibold text-dark-blue"
          >
            Use Template
          </motion.button>
        </div>
      </div>
    </CarouselItem>
  );
};
