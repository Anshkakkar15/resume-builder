import React, { forwardRef } from "react";
import { Template1 } from "./resumes/template1";

import { ResumeIds } from "@/constants/ResumeId";
import { usePathname } from "next/navigation";

export const ResumeComponent = forwardRef((props, ref) => {
  return (
    <div className="border-[15px] border-dark-blue">
      <div ref={ref} id={ResumeIds.ID_1}>
        <Template1 />
      </div>
    </div>
  );
});

ResumeComponent.displayName = "ResumeComponent";
