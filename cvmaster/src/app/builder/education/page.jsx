"use client";

import { BuilderLayout } from "@/components/BuilderLayout";
import { useToast } from "@/components/ui/use-toast";
import { nextStep } from "@/lib/getBuilderPage";
import { useDeleteEducationMutation } from "@/redux/api";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Education() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const educationInputs = useSelector((state) => state.EducationSlice);
  const userId = useSelector((state) => state.AuthSlice.userId);

  const [deleteEducation, { isLoading, isError }] =
    useDeleteEducationMutation();

  const handleDeleteEducation = async (id) => {
    const response = await deleteEducation({
      userId,
      resumeId,
      id,
    });
    if (response?.data?.success) {
      toast({
        title: response?.data?.message,
      });
    }
    if (isError) {
      toast({
        variant: "destructive",
        title: response?.error?.data?.message
          ? response?.error?.data?.message
          : "Error while Deleting",
      });
    }
  };

  const handleEditExperience = (id, index) => {
    router.push(`/builder/education/${resumeId}?edu=${id}&eduInd=${index}`);
  };

  return (
    <BuilderLayout
      heading="Education Summary"
      handleBack={() => {
        router.push(`/builder/education/${resumeId}`);
      }}
      handleContinue={() => {
        if (educationInputs?.educationFields?.length >= 1) {
          router.push(`/builder/skills/${resumeId}`), nextStep("skills");
        } else {
          router.push(`/builder/education/${resumeId}`);
        }
      }}
      resumeId={resumeId}
    >
      {educationInputs.educationFields?.length >= 1 &&
        educationInputs.educationFields?.map((education, index) => {
          return (
            education.instituteName && (
              <div
                key={index}
                className="rounded-md border-2 border-[#F9FAFB] bg-[#F9FAFB] p-5"
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-popins text-base font-semibold text-dark-blue">
                      {education.degree} | {education.instituteName}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span
                        onClick={() =>
                          handleEditExperience(education?._id, index)
                        }
                        className="cursor-pointer text-sm text-dark-blue transition-all duration-100 hover:text-green-700"
                      >
                        <Pencil width={17} height={17} />
                      </span>
                      <span
                        onClick={() => handleDeleteEducation(education?._id)}
                        className="cursor-pointer text-sm text-dark-blue transition-all duration-100 hover:text-red-700"
                      >
                        <Trash width={17} height={17} />
                      </span>
                    </div>
                  </div>
                  <p className="font-popins text-sm text-dark-blue">
                    {education.instituteLocation} | {education.graduationMonth}
                    {" - "}
                    {education.graduationYear}
                  </p>
                </div>
              </div>
            )
          );
        })}
      <div
        onClick={() => router.push(`/builder/education/${resumeId}`)}
        className="mt-5 flex cursor-pointer items-center gap-2"
      >
        <Plus /> Add More
      </div>
    </BuilderLayout>
  );
}
