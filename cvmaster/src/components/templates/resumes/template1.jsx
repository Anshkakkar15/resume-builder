import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import dayjs from "dayjs";
import Image from "next/image";

export const Template1 = ({ resume }) => {
  return (
    <div className="bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-popins text-3xl font-bold italic text-[#664b10]">
            {resume.introduction.firstName || resume.introduction.lastName
              ? resume.introduction.firstName
              : "Avery Davis"}
            {resume.introduction.lastName}
          </h1>
          <h2 className="font-popins text-xl font-semibold italic text-[#171717]">
            {resume.introduction.jobTitle
              ? resume.introduction.jobTitle
              : "Web Designer"}
          </h2>
        </div>
        <div className="max-w-36">
          {resume.introduction.imageUrl && (
            <Image
              src={resume.introduction.imageUrl}
              alt={resume.introduction.firstName}
              className="overflow-hidden"
              width={100}
              height={100}
            />
          )}
        </div>
      </div>
      <div className="pt-5">
        <div className="border border-[#664b10] px-3 py-2">
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-2">
              <Mail />
              <span className="my-auto text-xs font-semibold text-[#664b10]">
                {resume.introduction.email
                  ? resume.introduction.email
                  : "averydavis@example.com"}
              </span>
            </div>
            <div className="flex gap-2">
              <Phone />
              <span className="my-auto text-xs font-semibold text-[#664b10]">
                {resume.introduction.phone
                  ? resume.introduction.phone
                  : "9876543210"}
              </span>
            </div>
            <div className="flex gap-2">
              <MapPin />
              <span className="my-auto text-xs font-semibold text-[#664b10]">
                {resume.introduction.address
                  ? resume.introduction.address
                  : "Delhi,india"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <p className="font-popins text-xs text-[#171717]">
          {resume.summary.summary
            ? resume.summary.summary
            : `Enthusiastic and self-motivated web designer with 5• years of
          experience. Eager to join Studio Shodwe and bring my skill in frontend
          development, and visual design to every project that will be received
          in the future. A previous project for improving and redesigning
          reallygreatsite.com resulted in an increase in web tramc by 50% and
          performance improvement by`}
        </p>
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-center gap-10 pb-5">
          <h2 className="font-popins text-xl font-bold italic text-[#664b10]">
            Experience
          </h2>
          <div className="w-full border-b-[1px] border-[#664b10]" />
        </div>
        <VerticalTimeline
          className="template1_line_color"
          animate={false}
          layout="1-column"
          lineColor="#664b10"
        >
          {resume?.experience?.experienceFields?.map((experience, i) => {
            return (
              <VerticalTimelineElement
                key={i}
                icon={null}
                iconStyle={{
                  background: "#664b10",
                  color: "#664b10",
                  width: "20px",
                  height: "20px",
                }}
              >
                <div className="mt-0 flex justify-between">
                  <div className="flex flex-col space-y-2">
                    <span className="font-popins text-base font-semibold text-[#171717]">
                      {experience?.jobTitle}
                    </span>
                    <span className="font-popins font-normal text-[#171717]">
                      {experience?.employer} {experience?.city && ","}{" "}
                      <span className="italic">
                        {experience?.city}
                        {experience?.country && ","} {experience?.country}
                      </span>
                    </span>
                  </div>
                  <span className="font-popins text-xs font-semibold italic text-[#171717]">
                    {experience?.startDate &&
                      dayjs(experience?.startDate).format("MMMM YYYY")}{" "}
                    -{" "}
                    {experience?.isPresent
                      ? "Present"
                      : experience?.endDate &&
                        dayjs(experience?.endDate).format("MMMM YYYY")}
                  </span>
                </div>

                <div
                  className="text_editor_design mt-2 font-popins"
                  dangerouslySetInnerHTML={{
                    __html: experience?.responsibilities,
                  }}
                />
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
      <div className="">
        <div className="flex items-center justify-center gap-10 pb-5">
          <h2 className="font-popins text-xl font-bold italic text-[#664b10]">
            Education
          </h2>
          <div className="w-full border-b-[1px] border-[#664b10]" />
        </div>
        <VerticalTimeline
          className="template1_line_color"
          animate={false}
          layout="1-column"
          lineColor="#664b10"
        >
          {resume?.education?.educationFields?.length >= 1 &&
            resume?.education?.educationFields?.map((education, i) => {
              return (
                <VerticalTimelineElement
                  key={i}
                  icon={null}
                  iconStyle={{
                    background: "#664b10",
                    color: "#664b10",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-2">
                      <span className="font-popins text-base font-semibold text-[#171717]">
                        {education?.degree}
                      </span>
                      <span className="font-popins font-normal text-[#171717]">
                        {education?.instituteName}{" "}
                        {education?.instituteLocation && ","}{" "}
                        <span className="italic">
                          {education?.instituteLocation}
                        </span>
                      </span>
                    </div>
                    <span className="font-popins text-xs font-semibold italic text-[#171717]">
                      {education?.graduationMonth}-{education?.graduationYear}
                    </span>
                  </div>
                </VerticalTimelineElement>
              );
            })}
        </VerticalTimeline>
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-center gap-10 pb-5">
          <h2 className="font-popins text-xl font-bold italic text-[#664b10]">
            Skills
          </h2>
          <div className="w-full border-b-[1px] border-[#664b10]" />
        </div>
        <ul className="ml-9 flex list-disc flex-wrap gap-y-3">
          {resume.skills?.length >= 1 &&
            resume.skills.map((skills, i) => {
              return (
                <li
                  key={i}
                  className="basis-1/2 text-sm font-semibold text-[#171717]"
                >
                  {skills.language}
                </li>
              );
            })}
        </ul>
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-center gap-10 pb-5">
          <h2 className="font-popins text-xl font-bold italic text-[#664b10]">
            Language
          </h2>
          <div className="w-full border-b-[1px] border-[#664b10]" />
        </div>
        <ul className="ml-9 flex list-disc flex-wrap gap-y-3">
          {resume.languages?.length >= 1 &&
            resume.languages.map((language, i) => {
              return (
                <li
                  key={i}
                  className="basis-1/2 text-sm font-semibold text-[#171717]"
                >
                  {language.language}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
