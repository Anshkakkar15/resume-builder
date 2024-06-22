"use client";
import { BuilderLayout } from "@/components/BuilderLayout";
import html2pdf from "html2pdf.js";

import { useRef } from "react";

export default function Download() {
  const pdfRef = useRef();

  const handleDownloadPdf = async () => {
    const opt = {
      margin: 0.3,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2.5 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(pdfRef?.current).save();
  };

  return (
    <BuilderLayout
      layoutClass={"!grid-cols-1 max-w-[800px] mx-auto"}
      heading="Download Your CV"
      description="Click the button below to download your CV in PDF format."
      continueBtn="Download"
      ref={pdfRef}
      handleContinue={handleDownloadPdf}
    />
  );
}
