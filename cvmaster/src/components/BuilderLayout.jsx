"use client";

<<<<<<< HEAD
import React from "react";
=======
import React, { forwardRef } from "react";
>>>>>>> a4ade07feb9590374013382c9f824a4e5947e3e0
import { ResumeComponent } from "./templates";

import { Footer } from "./Footer";
import { BuilderTopbar } from "./BuilderTopbar";
import { motion, AnimatePresence } from "framer-motion";

<<<<<<< HEAD
export const BuilderLayout = (props) => {
=======
export const BuilderLayout = forwardRef((props, ref) => {
>>>>>>> a4ade07feb9590374013382c9f824a4e5947e3e0
  return (
    <>
      <BuilderTopbar />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: -10 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          layout
          className="container mx-auto px-3 py-3 sm:px-5 sm:py-4 md:px-7 lg:px-8"
        >
<<<<<<< HEAD
          <div className="py-16">
            <div className={`grid grid-cols-2 ${props?.layoutClass} gap-8`}>
              <div className="flex flex-col gap-y-5">
                <h1 className="font-popins text-4xl font-semibold text-dark-blue">
                  {props?.heading}
                </h1>
                <p className="font-popins text-xl font-medium text-dark-blue">
=======
          <div className="py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 ${props?.layoutClass} gap-8`}
            >
              <div className="flex flex-col gap-y-2 md:gap-y-4 xl:gap-y-6">
                <h1 className="font-popins text-xl font-semibold text-dark-blue md:text-2xl xl:text-4xl">
                  {props?.heading}
                </h1>
                <p className="font-popins text-sm font-medium text-dark-blue md:text-base xl:text-xl">
>>>>>>> a4ade07feb9590374013382c9f824a4e5947e3e0
                  {props?.description}
                </p>
                {props.children}
              </div>
<<<<<<< HEAD
              <div>
                <ResumeComponent />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between pb-10">
=======
              <div className="flex w-full justify-between pb-10 lg:hidden">
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
                  {props?.continueBtn ? props?.continueBtn : "Continue"}
                </motion.button>
              </div>
              <div>
                <ResumeComponent ref={ref} />
              </div>
            </div>
          </div>
          <div className="hidden w-full justify-between pb-10 lg:flex">
>>>>>>> a4ade07feb9590374013382c9f824a4e5947e3e0
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
              {props?.continueBtn ? props?.continueBtn : "Continue"}
            </motion.button>
          </div>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
<<<<<<< HEAD
};
=======
});

BuilderLayout.displayName = "BuilderLayout";
>>>>>>> a4ade07feb9590374013382c9f824a4e5947e3e0
