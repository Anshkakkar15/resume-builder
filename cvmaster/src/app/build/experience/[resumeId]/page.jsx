"use client";

import { useParams, useRouter } from "next/navigation";
import { BuilderLayout } from "@/components/BuilderLayout";
import { useForm } from "react-hook-form";
import { useImperativeHandle, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { CustomDatePicker } from "@/components/DatePicker";
import { TextEditor } from "@/components/TextEditor";

export default function Experience() {
  const { resumeId } = useParams();
  const formRef = useRef();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      jobTitle: "",
      employer: "",
      city: "",
      country: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
    // resolver: yupResolver(),
  });

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddExperience),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddExperience = (data) => {
    console.log(data);
  };

  return (
    <BuilderLayout
      heading="Let's focus on your experience now"
      description="Start with your most recent job first."
      handleContinue={handleContinue}
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
          <div className="mt-3 flex flex-wrap gap-3">
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>START DATE</FormLabel>
                    <CustomDatePicker />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-none sm:w-1/2 sm:flex-1">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>END DATE</FormLabel>
                    <CustomDatePicker />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-3">
            <FormLabel className="mb-2">RESPONSIBILITIES</FormLabel>
            <TextEditor
              name="responsibilities"
              control={form.control}
              defaultValue={"gelo"}
            />
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
