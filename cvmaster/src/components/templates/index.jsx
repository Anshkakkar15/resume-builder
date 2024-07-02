import React, { forwardRef } from "react";
import { Template1 } from "./resumes/template1";

import { ResumeIds } from "@/constants/ResumeId";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export const ResumeComponent = forwardRef((props, ref) => {
  const introductionInputs = useSelector((state) => state.IntroductionSlice);
  const resumeDetails = {
    introduction: introductionInputs,
  };
  return (
    <div className="border-[15px] border-dark-blue">
      <div ref={ref} id={ResumeIds.ID_1}>
        <Template1 resume={resumeDetails} />
      </div>
    </div>
  );
});

ResumeComponent.displayName = "ResumeComponent";
