"use client";

import { BuilderLayout } from "@/components/BuilderLayout";
import { nextStep } from "@/lib/getBuilderPage";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Experience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  const handleEditExperience = (id) => {
    router.push(`/build/experience/${resumeId}?expid=${id}`);
  };

  return (
    <BuilderLayout
      heading={"Review your experience"}
      handleBack={() => router.push(`/build/experience/${resumeId}`)}
      handleContinue={() => {
        router.push(`/build/education/${resumeId}`);
        nextStep("education");
      }}
    >
      <div className="rounded-md border-2 border-[#F9FAFB] bg-[#F9FAFB] p-5">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-popins text-base font-semibold text-dark-blue">
              Coderzbars | React Developer
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
          <ul className="ml-5 list-disc">
            <li className="font-popins text-sm text-dark-blue">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
              doloribus laborum quo, inventore optio nostrum, porro dolor quis
              explicabo magnam minus magni cumque quia dignissimos illo dolorem
              expedita nihil aliquid.
            </li>
            <li className="font-popins text-sm text-dark-blue">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
              doloribus laborum quo, inventore optio nostrum, porro dolor quis
              explicabo magnam minus magni cumque quia dignissimos illo dolorem
              expedita nihil aliquid.
            </li>
          </ul>
        </div>
      </div>
      <div
        onClick={() => router.push(`/build/experience/${resumeId}`)}
        className="mt-5 flex cursor-pointer items-center gap-2"
      >
        <Plus /> Add More
      </div>
    </BuilderLayout>
  );
}
