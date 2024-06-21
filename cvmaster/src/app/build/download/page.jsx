"use client";
import { BuilderLayout } from "@/components/BuilderLayout";

import html2pdf from "html2pdf.js";
import { ResumeIds } from "@/constants/ResumeId";

export default function Download() {
  const handleDownloadPdf = async () => {
    const element =
      typeof window !== undefined && document.getElementById(ResumeIds.ID_1);
    const opt = {
      margin: 0,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2.5 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <BuilderLayout
      layoutClass={"!grid-cols-1 max-w-[800px] mx-auto"}
      heading="Download Your Resume"
      description="You can download your resume in pdf format by clicking below download button"
      continueBtn="Download"
      handleContinue={handleDownloadPdf}
    />
  );
}
