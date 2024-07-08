"use client";

import { BuilderLayout } from "@/components/BuilderLayout";
import { nextStep } from "@/lib/getBuilderPage";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Education() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  const handleEditExperience = (id) => {
    router.push(`/builder/education/${resumeId}?edu=${id}`);
  };

  return (
    <BuilderLayout
      heading="Education Summary"
      handleBack={() => {
        router.push(`/builder/education/${resumeId}`);
      }}
      handleContinue={() => {
        router.push(`/builder/skills/${resumeId}`), nextStep("skills");
      }}
      resumeId={resumeId}
    >
      <div className="rounded-md border-2 border-[#F9FAFB] bg-[#F9FAFB] p-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-popins text-base font-semibold text-dark-blue">
              Ips | 12th
            </h3>
            <div className="flex items-center gap-3">
              <span
                onClick={() => handleEditExperience("idno1")}
                className="cursor-pointer text-sm text-dark-blue transition-all duration-100 hover:text-green-700"
              >
                <Pencil width={17} height={17} />
              </span>
              <span className="cursor-pointer text-sm text-dark-blue transition-all duration-100 hover:text-red-700">
                <Trash width={17} height={17} />
              </span>
            </div>
          </div>
          <p className="font-popins text-sm text-dark-blue">
            Mohali India | April 2023 - Present
          </p>
        </div>
      </div>
      <div
        onClick={() => router.push(`/builder/education/${resumeId}`)}
        className="mt-5 flex cursor-pointer items-center gap-2"
      >
        <Plus /> Add More
      </div>
    </BuilderLayout>
  );
}
