"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ASSETS } from "../../../assets";
import { StepDetails, resumeTemplates } from "../../../mock/Home";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { TemplateCard } from "@/components/Template-Card";

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -10 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        layout
      >
        <div className="bg-light-blue">
          <div className="container mx-auto px-3 py-5 sm:px-5 sm:py-7 md:px-7 md:py-9 lg:px-8 xl:px-11 2xl:py-14">
            {/* hero section */}
            <div className="grid grid-cols-1 items-center gap-x-5 gap-y-9 sm:grid-cols-2">
              <div className="mx-auto flex max-w-[450px] flex-col gap-y-3 sm:max-w-full xl:gap-y-6">
                <h1 className="font-popins text-xl font-semibold leading-7 text-dark-blue md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 2xl:leading-[65px]">
                  Craft Your Perfect Resume in Minutes!
                </h1>
                <p className="font-popins text-sm leading-6 text-dark-blue md:text-base xl:text-lg xl:leading-9 2xl:text-xl">
                  Create a professional resume effortlessly with our innovative
                  builder. Customize templates, highlight your achievements, and
                  land your dream job
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-3 max-w-max border-dark-blue bg-transparent px-4 font-popins hover:bg-dark-blue hover:text-white md:px-6 md:text-base xl:mt-14 xl:px-10 xl:py-3 xl:text-lg"
                >
                  <a href="#templates"> Craft Your Resume</a>
                </Button>
              </div>
              <div className="flex justify-end">
                <Image
                  src={ASSETS.HERO_RESUME}
                  className="mx-auto h-full w-full max-w-[450px]"
                  alt="resume"
                />
              </div>
            </div>
          </div>
        </div>
        {/* templates */}
        <div
          id="templates"
          className="container mx-auto px-3 pt-6 sm:px-5 sm:pt-9 md:px-7 md:pt-11 lg:px-8 lg:pt-14 2xl:pt-16"
        >
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {resumeTemplates?.length >= 1 &&
                resumeTemplates?.map((temlates) => (
                  <TemplateCard temlates={temlates} key={temlates?.id} />
                ))}
            </CarouselContent>
          </Carousel>
        </div>
        {/* step section */}
        <div className="container mx-auto px-3 pt-6 sm:px-5 sm:pt-9 md:pt-11 lg:px-8 lg:pt-14 xl:py-14 2xl:pt-16">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
            {StepDetails?.length >= 1 &&
              StepDetails?.map((steps) => {
                return (
                  <div
                    key={steps.id}
                    className="flex flex-col items-center gap-y-3 sm:gap-y-5 md:gap-y-7 xl:gap-y-10"
                  >
                    <Image src={steps.image} alt="step" />
                    <h3 className="text-center font-popins text-lg font-medium text-dark-blue md:text-xl xl:text-2xl">
                      {steps.heading}
                    </h3>
                  </div>
                );
              })}
          </div>
        </div>
        {/* bottom */}
        <div className="ssklk mt-6 h-full min-h-[250px] w-full bg-cover bg-no-repeat sm:mt-9 sm:min-h-[300px] md:mt-11 md:min-h-[350px] lg:min-h-[400px] 2xl:min-h-[450px]">
          <div className="container mx-auto">
            <div className="flex min-h-[250px] flex-col items-center justify-center gap-4 sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px] xl:gap-9 2xl:min-h-[450px]">
              <h2 className="w-full max-w-[500px] bg-[#050c9c] text-center font-popins text-xl font-medium text-white md:text-2xl lg:text-3xl xl:max-w-[550px]">
                Experience the power of ResumeCraft CV Builder now.
              </h2>
              <Button
                size="lg"
                className="max-w-max rounded-full bg-[#E88D67] px-5 font-popins text-white hover:bg-[#c7724d] hover:text-white sm:px-7 xl:px-16 xl:text-lg"
              >
                <a href="#templates"> Craft Your Resume</a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
