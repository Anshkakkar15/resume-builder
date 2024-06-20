import React from "react";
import { ResumeComponent } from "./templates";

import { motion } from "framer-motion";
import { Footer } from "./Footer";
import { BuilderTopbar } from "./BuilderTopbar";

export const BuilderLayout = (props) => {
  return (
    <>
      <BuilderTopbar />
      <div className="container mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-y-5">
              <h1 className="font-popins text-4xl font-semibold text-dark-blue">
                {props?.heading}
              </h1>
              <p className="font-popins text-xl font-medium text-dark-blue">
                {props?.description}
              </p>
              {props.children}
            </div>
            <div>
              <ResumeComponent />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between pb-10">
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full border border-dark-blue bg-white px-12 py-2 text-lg text-dark-blue"
            onClick={props?.handleBack}
          >
            Back
          </motion.button>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full border border-[#4285f4] bg-[#4285f4] px-12 py-2 text-lg text-white"
            onClick={props?.handleContinue}
          >
            Continue
          </motion.button>
        </div>
        <Footer />
      </div>
    </>
  );
};
