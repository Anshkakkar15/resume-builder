import React, { forwardRef } from "react";
import { Template1 } from "./resumes/template1";

import { ResumeIds } from "@/constants/ResumeId";
import { useSelector } from "react-redux";

export const ResumeComponent = forwardRef((props, ref) => {
  const introductionInputs = useSelector((state) => state.IntroductionSlice);
  const summaryInputs = useSelector((state) => state.SummarySlice);
  const languageInput = useSelector((state) => state.LanguageSlice.language);

  const resumeDetails = {
    introduction: introductionInputs,
    summary: summaryInputs,
    languages: languageInput,
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
