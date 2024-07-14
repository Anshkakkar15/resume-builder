"use client";

import React, { forwardRef, useEffect } from "react";
import { ResumeComponent } from "./templates";

import { Footer } from "./Footer";
import { BuilderTopbar } from "./BuilderTopbar";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useToken } from "@/lib/useToken";
import { useAuth } from "@/lib/useAuth";
import { updateUserAuth } from "@/redux/slices/AuthSlice";
import { updateIntroduction } from "@/redux/slices/IntroductionSlice";
import {
  useGetEducationListQuery,
  useGetExperienceListQuery,
  useGetIntroductionQuery,
  useGetLanguagesQuery,
  useGetSkillsQuery,
  useGetSummaryQuery,
} from "@/redux/api";
import { ButtonLoader } from "./loaders/ButtonLoader";
import { updateSummary } from "@/redux/slices/SummarySlice";
import { setLanguages } from "@/redux/slices/LanguageSlice";
import {
  setExperienceField,
  updateIndex,
} from "@/redux/slices/ExperienceSlice";
import { setSkills } from "@/redux/slices/SkillsSlice";
import {
  setEducationField,
  updateEducationIndex,
} from "@/redux/slices/EducationSlice";

export const BuilderLayout = forwardRef((props, ref) => {
  const { getAuth } = useAuth();
  const { getToken } = useToken();
  const userDetails = getAuth();
  const userToken = getToken();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.AuthSlice.userId);

  const getIntroduction = useGetIntroductionQuery(
    `userId=${userId}&resumeId=${props?.resumeId}`,
    {
      skip: !userId,
    },
  );

  const getSummary = useGetSummaryQuery(
    `userId=${userId}&resumeId=${props?.resumeId}`,
    {
      skip: !userId,
    },
  );

  const getLanguages = useGetLanguagesQuery(
    `userId=${userId}&resumeId=${props?.resumeId}`,
    {
      skip: !userId,
    },
  );

  const getExperienceList = useGetExperienceListQuery(
    `userId=${userId}&resumeId=${props?.resumeId}`,
    {
      skip: !userId,
    },
  );

  const getSkillsList = useGetSkillsQuery(
    `userId=${userId}&resumeId=${props?.resumeId}`,
    {
      skip: !userId,
    },
  );

  const getEducationList = useGetEducationListQuery(
    `userId=${userId}&resumeId=${props?.resumeId}`,
    {
      skip: !userId,
    },
  );

  useEffect(() => {
    dispatch(
      updateIntroduction({
        firstName: getIntroduction?.data?.getUserIntro?.firstName,
        lastName: getIntroduction?.data?.getUserIntro?.lastName,
        jobTitle: getIntroduction?.data?.getUserIntro?.jobTitle,
        email: getIntroduction?.data?.getUserIntro?.email,
        phone: getIntroduction?.data?.getUserIntro?.phone,
        address: getIntroduction?.data?.getUserIntro?.address,
        imageUrl: getIntroduction?.data?.getUserIntro?.image,
      }),
    );
  }, [getIntroduction?.data?.getUserIntro]);

  useEffect(() => {
    dispatch(updateSummary(getSummary?.data?.getSummary?.summary));
  }, [getSummary?.data?.getSummary]);

  useEffect(() => {
    if (getLanguages?.isSuccess && getLanguages.data.getLanguages) {
      const languages = getLanguages.data.getLanguages.languages.map(
        (lang) => ({
          language: lang,
        }),
      );
      dispatch(setLanguages(languages));
    }
  }, [getLanguages?.isSuccess, dispatch]);

  useEffect(() => {
    if (userToken) {
      dispatch(
        updateUserAuth({
          userId: userToken,
          userDetails: userDetails && JSON.parse(userDetails),
        }),
      );
    }
  }, [userToken, userDetails]);

  useEffect(() => {
    dispatch(setExperienceField(getExperienceList?.data?.getUserExperience));
    dispatch(updateIndex(getExperienceList?.data?.getUserExperience.length));
  }, [getExperienceList?.data?.getUserExperience]);

  useEffect(() => {
    // skills
    if (getSkillsList?.isSuccess && getSkillsList?.data?.getSkills) {
      const languages = getSkillsList?.data?.getSkills?.skills?.map(
        (skill) => ({
          language: skill,
        }),
      );

      dispatch(setSkills(languages));
    }
  }, [getSkillsList?.isSuccess, dispatch]);

  useEffect(() => {
    dispatch(setEducationField(getEducationList?.data?.getUserEducation));
    dispatch(
      updateEducationIndex(getEducationList?.data?.getUserEducation?.length),
    );
  }, [getEducationList?.data?.getUserEducation]);

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
          <div className="py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 ${props?.layoutClass} gap-8`}
            >
              <div className="flex flex-col gap-y-2 md:gap-y-4 xl:gap-y-6">
                <h1 className="font-popins text-xl font-semibold text-dark-blue md:text-2xl xl:text-4xl">
                  {props?.heading}
                </h1>
                <p className="font-popins text-sm font-medium text-dark-blue md:text-base xl:text-xl">
                  {props?.description}
                </p>
                {props.children}
              </div>
              <div className="flex w-full items-center justify-between pb-10 lg:hidden">
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full border border-dark-blue bg-white px-12 py-2 text-lg text-dark-blue"
                  onClick={props?.handleBack}
                >
                  Back
                </motion.button>
                <div className="flex flex-wrap gap-3">
                  {props?.skipButton && (
                    <motion.button
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="rounded-full border border-[#e88d67] bg-[#e88d67] px-12 py-2 text-lg text-white"
                      onClick={props?.handleSkip}
                    >
                      {"Skip"}
                    </motion.button>
                  )}
                  {props?.isLoading ? (
                    <ButtonLoader />
                  ) : (
                    <motion.button
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="rounded-full border border-[#4285f4] bg-[#4285f4] px-12 py-2 text-lg text-white"
                      onClick={props?.handleContinue}
                    >
                      {props?.continueBtn ? props?.continueBtn : "Continue"}
                    </motion.button>
                  )}
                </div>
              </div>
              <div>
                <ResumeComponent ref={ref} />
              </div>
            </div>
          </div>
          <div className="hidden w-full justify-between pb-10 lg:flex">
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full border border-dark-blue bg-white px-12 py-2 text-lg text-dark-blue"
              onClick={props?.handleBack}
            >
              Back
            </motion.button>
            <div className="flex gap-3">
              {props?.skipButton && (
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full border border-[#e88d67] bg-[#e88d67] px-12 py-2 text-lg text-white"
                  onClick={props?.handleSkip}
                >
                  {"Skip"}
                </motion.button>
              )}
              {props?.isLoading ? (
                <ButtonLoader />
              ) : (
                <motion.button
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="rounded-full border border-[#4285f4] bg-[#4285f4] px-12 py-2 text-lg text-white"
                  onClick={props?.handleContinue}
                >
                  {props?.continueBtn ? props?.continueBtn : "Continue"}
                </motion.button>
              )}
            </div>
          </div>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
});

BuilderLayout.displayName = "BuilderLayout";
