"use client";

import { BuilderLayout } from "@/components/BuilderLayout";
import { useToast } from "@/components/ui/use-toast";
import { nextStep } from "@/lib/getBuilderPage";
import { useDeleteExperienceMutation } from "@/redux/api";
import { addExperience, updateIndex } from "@/redux/slices/ExperienceSlice";
import dayjs from "dayjs";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Experience() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [deleteExperience, { isLoading, isError }] =
    useDeleteExperienceMutation();

  const userId = useSelector((state) => state.AuthSlice.userId);

  const experienceInputs = useSelector((state) => state.ExperienceSlice);

  const handleEditExperience = (id, index) => {
    router.push(`/builder/experience/${resumeId}?expid=${id}&epxind=${index}`);
  };

  const handleDeleteExperience = async (id) => {
    const response = await deleteExperience({
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
          : "Error while submitting details",
      });
    }
  };

  return (
    <BuilderLayout
      heading={"Review your experience"}
      handleBack={() => router.push(`/builder/experience/${resumeId}`)}
      handleContinue={() => {
        if (experienceInputs?.experienceFields?.length >= 1) {
          router.push(`/builder/education/${resumeId}`);
          nextStep("education");
        } else {
          router.push(`/builder/experience/${resumeId}`);
        }
      }}
      resumeId={resumeId}
    >
      {experienceInputs.experienceFields?.length >= 1
        ? experienceInputs.experienceFields?.map((experience, i) => {
            return (
              experience?.jobTitle && (
                <div
                  className="rounded-md border-2 border-[#F9FAFB] bg-[#F9FAFB] p-5"
                  key={i}
                >
                  <div className="flex flex-col gap-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-popins text-base font-semibold text-dark-blue">
                        {experience.employer} | {experience.jobTitle}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span
                          onClick={() => {
                            handleEditExperience(experience._id, i);
                          }}
                          className="cursor-pointer text-sm text-dark-blue transition-all duration-100 hover:text-green-700"
                        >
                          <Pencil width={17} height={17} />
                        </span>
                        <span
                          onClick={() =>
                            handleDeleteExperience(experience?._id)
                          }
                          className="cursor-pointer text-sm text-dark-blue transition-all duration-100 hover:text-red-700"
                        >
                          <Trash width={17} height={17} />
                        </span>
                      </div>
                    </div>
                    <p className="font-popins text-sm text-dark-blue">
                      {experience.city} {experience.country} |{" "}
                      {experience?.startDate &&
                        dayjs(experience?.startDate).format("MMMM YYYY")}{" "}
                      -{" "}
                      {experience?.isPresent
                        ? "Present"
                        : experience?.endDate &&
                          dayjs(experience?.endDate).format("MMMM YYYY")}
                    </p>
                    <div
                      className="text_editor_design mt-2 font-popins"
                      dangerouslySetInnerHTML={{
                        __html: experience.responsibilities,
                      }}
                    />
                  </div>
                </div>
              )
            );
          })
        : null}

      <div
        onClick={() => {
          router.push(`/builder/experience/${resumeId}`);
          dispatch(addExperience());
        }}
        className="mt-5 flex cursor-pointer items-center gap-2"
      >
        <Plus /> Add More
      </div>
    </BuilderLayout>
  );
}

{
  /* {experienceInputs.experienceFields?.map((experience) => {
        console.log(experience);
        return (
          <div className="rounded-md border-2 border-[#F9FAFB] bg-[#F9FAFB] p-5">
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-popins text-base font-semibold text-dark-blue">
                  {experience.employer} | {experience.jobTitle}
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
                {experience.city} {experience.country} |
                {format(new Date(experience.startDate), "MMM yyyy")} -{" "}
                {experience?.preset
                  ? "present"
                  : format(new Date(experience.lastDate), "MMM yyyy")}
              </p>
              {/* <ul className="ml-5 list-disc">
                <li className="font-popins text-sm text-dark-blue">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dicta doloribus laborum quo, inventore optio nostrum, porro
                  dolor quis explicabo magnam minus magni cumque quia
                  dignissimos illo dolorem expedita nihil aliquid.
                </li>
              </ul>

              <div
                dangerouslySetInnerHTML={{
                  __html: experience.responsibilities,
                }}
              />
            </div>
          </div>
        );
      })} */
}
