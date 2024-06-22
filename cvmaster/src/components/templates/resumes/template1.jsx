import React from "react";
import { ASSETS } from "../../../../assets";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
<<<<<<< HEAD
import { ResumeIds } from "@/constants/ResumeId";

export const Template1 = () => {
  return (
    <div id={ResumeIds.ID_1} className="bg-white p-5 shadow-xl">
=======

export const Template1 = () => {
  return (
    <div className="bg-white p-5 shadow-xl">
>>>>>>> a4ade07feb9590374013382c9f824a4e5947e3e0
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-popins text-3xl font-bold italic text-[#664b10]">
            Avery Davis
          </h1>
          <h2 className="font-popins text-xl font-semibold italic text-[#171717]">
            Web Designer
          </h2>
        </div>
        <div className="max-w-36">
          <Image
            src={ASSETS.AUTH_IMG}
            alt="Avery Davis"
            className="overflow-hidden"
          />
        </div>
      </div>
      <div className="pt-5">
        <div className="border border-[#664b10] px-3 py-2">
          <div className="flex flex-wrap justify-between">
            <div className="flex gap-2">
              <Mail />
              <span className="my-auto text-xs font-semibold text-[#664b10]">
                kakkaransh40@gmail.com
              </span>
            </div>
            <div className="flex gap-2">
              <Phone />
              <span className="my-auto text-xs font-semibold text-[#664b10]">
                9878954548
              </span>
            </div>
            <div className="flex gap-2">
              <MapPin />
              <span className="my-auto text-xs font-semibold text-[#664b10]">
                Mohali,India
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <p className="font-popins text-xs text-[#171717]">
          Enthusiastic and self-motivated web designer with 5• years of
          experience. Eager to join Studio Shodwe and bring my skill in frontend
          development, and visual design to every project that will be received
          in the future. A previous project for improving and redesigning
          reallygreatsite.com resulted in an increase in web tramc by 50% and
          performance improvement by
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
          {new Array(2).fill(true).map((elm, i) => {
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
                    Graphic Designer
                  </span>
                  <span className="font-popins text-xs font-semibold italic text-[#171717]">
                    May-2015-June-2017
                  </span>
                </div>
                <ul className="ml-8 mt-2 flex list-disc flex-col gap-y-2">
                  <li className="font-popins text-xs text-[#171717]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Hic soluta beatae, modi cumque aspernatur nulla
                  </li>
                  <li className="font-popins text-xs text-[#171717]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Hic soluta beatae, modi cumque aspernatur nulla
                  </li>
                </ul>
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
        <ul className="ml-9 flex list-disc flex-wrap justify-center gap-y-3">
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            English
          </li>
          <li className="basis-1/2 text-sm font-semibold text-[#171717]">
            Hindi
          </li>
        </ul>
      </div>
    </div>
  );
};
