import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import dayjs from "dayjs";

export const Template1 = ({ resume }) => {
  return (
    <div className="bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-popins text-3xl font-bold italic text-[#664b10]">
            {resume.introduction.firstName || resume.introduction.lastName
              ? resume.introduction.firstName
              : "Avery Davis"}{" "}
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
            <img
              src={`${resume.introduction.imageUrl}`}
              alt="Avery Davis"
              className="overflow-hidden"
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
                <div className="mt-0 flex items-center justify-between">
                  <span className="font-popins text-base font-semibold text-[#171717]">
                    {experience?.jobTitle}
                  </span>
                  <span className="font-popins text-xs font-semibold italic text-[#171717]">
                    {dayjs(experience?.startDate).format("MMMM - YYYY")} -{" "}
                    {experience?.present
                      ? "Present"
                      : dayjs(experience?.lastDate).format("MMMM - YYYY")}
                  </span>
                </div>
                {/* <ul className="ml-8 mt-2 flex list-disc flex-col gap-y-2">
                  <li className="font-popins text-xs text-[#171717]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Hic soluta beatae, modi cumque aspernatur nulla
                  </li>
                  <li className="font-popins text-xs text-[#171717]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Hic soluta beatae, modi cumque aspernatur nulla
                  </li>
                </ul> */}
                <div
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
          <VerticalTimelineElement
            icon={null}
            iconStyle={{
              background: "#664b10",
              color: "#664b10",
              width: "20px",
              height: "20px",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-popins text-base font-semibold text-[#171717]">
                Graphic Designer
              </span>
              <span className="font-popins text-xs font-semibold italic text-[#171717]">
                June-2017
              </span>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            icon={null}
            iconStyle={{
              background: "#664b10",
              color: "#664b10",
              width: "20px",
              height: "20px",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-popins text-base font-semibold text-[#171717]">
                Graphic Designer
              </span>
              <span className="font-popins text-xs font-semibold italic text-[#171717]">
                June-2017
              </span>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-center gap-10 pb-5">
          <h2 className="font-popins text-xl font-bold italic text-[#664b10]">
            Skills
          </h2>
          <div className="w-full border-b-[1px] border-[#664b10]" />
        </div>
        <ul className="ml-9 flex list-disc flex-wrap justify-center gap-y-3">
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            Html
          </li>
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            Css
          </li>
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            Javascipt
          </li>
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            React
          </li>
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            Next
          </li>
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            Angular
          </li>
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
