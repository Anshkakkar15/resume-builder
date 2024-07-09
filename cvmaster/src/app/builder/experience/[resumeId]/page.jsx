"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BuilderLayout } from "@/components/BuilderLayout";
import { useForm } from "react-hook-form";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/DatePicker";
import { TextEditor } from "@/components/TextEditor";
import { experienceSchema } from "@/schemas/experinceSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { backStep } from "@/lib/getBuilderPage";
import { useDispatch, useSelector } from "react-redux";
import {
  experienctState,
  updateExperience,
} from "@/redux/slices/ExperienceSlice";
import {
  useAddExperienceDetailsMutation,
  useGetSingleExperienceQuery,
  useUpdateExperienceDetailsMutation,
} from "@/redux/api";
import { useToast } from "@/components/ui/use-toast";

export default function Experience({ params }) {
  const formRef = useRef();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const expid = searchParams.get("expid");
  const expIndex = searchParams.get("epxind");
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [addExperience, { isLoading, isError }] =
    useAddExperienceDetailsMutation();

  const [editExperience] = useUpdateExperienceDetailsMutation();

  const userId = useSelector((state) => state.AuthSlice.userId);
  const experienceInputs = useSelector((state) => state.ExperienceSlice);

  const getSingleExperience = useGetSingleExperienceQuery(
    `id=${expid}&userId=${userId}&resumeId=${params?.resumeId}`,
    {
      skip: !expid,
      refetchOnMountOrArgChange: true,
    },
  );

  const form = useForm({
    defaultValues: experienctState,
    resolver: yupResolver(experienceSchema),
  });

  useEffect(() => {
    if (getSingleExperience?.currentData?.getSingleUserExperience) {
      const defaultValues = {};
      defaultValues.jobTitle =
        getSingleExperience.currentData.getSingleUserExperience.jobTitle;
      defaultValues.employer =
        getSingleExperience.currentData.getSingleUserExperience.employer;
      defaultValues.city =
        getSingleExperience.currentData.getSingleUserExperience.city;
      defaultValues.country =
        getSingleExperience.currentData.getSingleUserExperience.country;
      defaultValues.startDate =
        getSingleExperience.currentData.getSingleUserExperience.startDate;
      defaultValues.endDate =
        getSingleExperience.currentData.getSingleUserExperience.endDate;
      defaultValues.responsibilities =
        getSingleExperience.currentData.getSingleUserExperience.responsibilities;
      defaultValues.isPresent =
        getSingleExperience.currentData.getSingleUserExperience.isPresent;
      setIsChecked(
        getSingleExperience.currentData.getSingleUserExperience.isPresent,
      );
      form.reset(defaultValues);
    }
  }, [getSingleExperience?.currentData?.getSingleUserExperience]);

  useEffect(() => {
    if (isChecked) {
      form.setValue("endDate", "");
    }
  }, [isChecked, form]);

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddExperience),
  }));

  const handleUpdateInputs = (field, value) => {
    dispatch(
      updateExperience({
        index: expIndex ? expIndex : experienceInputs.index,
        value: { [field]: value },
      }),
    );
  };

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddExperience = async (data) => {
    const expObj = {
      userId: userId,
      resumeId: params.resumeId,
      jobTitle: data.jobTitle,
      employer: data.employer,
      city: data.city,
      country: data.country,
      startDate: data.startDate,
      endDate: data.endDate,
      responsibilities: data.responsibilities,
      isPresent: data.isPresent,
    };
    if (expid) {
      expObj["id"] = expid;
      const response = await editExperience(expObj);
      if (response?.data?.success) {
        toast({
          title: response?.data?.message,
        });
        router.push(`/builder/experience?id=${params?.resumeId}`);
      }
      if (isError) {
        toast({
          variant: "destructive",
          title: response?.error?.data?.message
            ? response?.error?.data?.message
            : "Error while submitting details",
        });
      }
    } else {
      const response = await addExperience(expObj);
      if (response?.data?.success) {
        toast({
          title: response?.data?.message,
        });
        router.push(`/builder/experience?id=${params?.resumeId}`);
      }
      if (isError) {
        toast({
          variant: "destructive",
          title: response?.error?.data?.message
            ? response?.error?.data?.message
            : "Error while submitting details",
        });
      }
    }
  };

  return (
    <BuilderLayout
      heading="Let's focus on your experience now"
      description="Start with your most recent job first."
      handleContinue={handleContinue}
      handleBack={() => {
        router.push(`/builder/language/${params.resumeId}`);
        backStep("experience");
      }}
      resumeId={params.resumeId}
      isLoading={isLoading}
      skipButton={experienceInputs?.experienceFields?.length >= 1}
      handleSkip={() => {
        router.push(`/builder/experience?id=${params?.resumeId}`);
      }}
    >
      <Form {...form}>
        <form>
          <div className="flex flex-wrap gap-3">
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JOB TITLE</FormLabel>
                    <Input
                      {...field}
                      placeholder="JOB TITLE"
                      onChange={(e) => {
                        field.onChange(e);
                        handleUpdateInputs(field.name, e.target.value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              <FormField
                control={form.control}
                name="employer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EMPLOYER</FormLabel>
                    <Input
                      {...field}
                      placeholder="EMPLOYER"
                      onChange={(e) => {
                        field.onChange(e);
                        handleUpdateInputs(field.name, e.target.value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CITY</FormLabel>
                    <Input
                      {...field}
                      placeholder="CITY"
                      onChange={(e) => {
                        field.onChange(e);
                        handleUpdateInputs(field.name, e.target.value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>COUNTRY</FormLabel>
                    <Input
                      {...field}
                      placeholder="COUNTRY"
                      onChange={(e) => {
                        field.onChange(e);
                        handleUpdateInputs(field.name, e.target.value);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div
            className={`mt-3 flex flex-wrap ${isChecked ? "items-center" : ""} gap-3`}
          >
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>START DATE</FormLabel>
                    <DatePicker
                      date={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                        handleUpdateInputs(field.name, date);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              {!isChecked && (
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>END DATE</FormLabel>
                      <DatePicker
                        date={field.value}
                        onChange={(date) => {
                          field.onChange(date);
                          handleUpdateInputs(field.name, date);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="isPresent"
                render={({ field }) => (
                  <FormItem className={cn("mt-5 flex items-center gap-3")}>
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          setIsChecked(checked);
                          field.onChange(checked);
                          handleUpdateInputs(field.name, checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Present</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div cla ssName="mt-3">
            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RESPONSIBILITIES</FormLabel>
                  <TextEditor
                    control={form.control}
                    onChange={(value) => {
                      field.onChange(value);
                      handleUpdateInputs(field.name, value);
                    }}
                    defaultValues={
                      getSingleExperience?.currentData?.getSingleUserExperience
                        .responsibilities
                        ? getSingleExperience?.currentData
                            .getSingleUserExperience?.responsibilities
                        : ""
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
