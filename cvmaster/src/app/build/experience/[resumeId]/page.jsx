"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import { useSelector } from "react-redux";

export default function Experience() {
  const { resumeId } = useParams();
  const formRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const expid = searchParams.get("expid");
  // console.log(atob(expid));

  const [isChecked, setIsChecked] = useState(false);
  const experienceInputs = useSelector((state) => state.ExperienceSlice);

  const form = useForm({
    defaultValues: experienceInputs,
    resolver: yupResolver(experienceSchema),
  });

  useEffect(() => {
    if (isChecked) {
      form?.setValue("endDate", "");
    }
  }, [isChecked, form]);

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddExperience),
  }));

  const handleContinue = () => {
    if (formRef?.current) {
      formRef?.current?.submit();
    }
  };

  const handleAddExperience = (data) => {
    router.push(`/build/experience?id=${resumeId}`);
    console.log(data);
  };

  return (
    <BuilderLayout
      heading="Let's focus on your experience now"
      description="Start with your most recent job first."
      handleContinue={handleContinue}
      handleBack={() => {
        router?.push(`/build/language/${resumeId}`);
        backStep("experience");
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
                    <Input {...field} placeholder="JOB TITLE" />
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
                    <Input {...field} placeholder="EMPLOYER" />
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
                    <Input {...field} placeholder="CITY" />
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
                    <Input {...field} placeholder="COUNTRY" />
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
                    <DatePicker date={field.value} onChange={field.onChange} />
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
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="present"
                render={({ field }) => (
                  <FormItem className={cn("mt-5 flex items-center gap-3")}>
                    <FormControl>
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          setIsChecked(checked);
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">Present</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-3">
            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RESPONSIBILITIES</FormLabel>
                  <TextEditor onChange={field.onChange} defaultValue={""} />
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
