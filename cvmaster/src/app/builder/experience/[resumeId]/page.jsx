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
import { useDispatch, useSelector } from "react-redux";
import {
  experienctState,
  updateExperience,
} from "@/redux/slices/ExperienceSlice";

export default function Experience({ params }) {
  const formRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const expid = searchParams.get("expid");
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const experienceInputs = useSelector((state) => state.ExperienceSlice);

  const form = useForm({
    defaultValues: experienctState,
    resolver: yupResolver(experienceSchema),
  });

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
        index: experienceInputs.index,
        value: { [field]: value },
      }),
    );
  };

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddExperience = (data) => {
    router.push(`/builder/experience?id=${params?.resumeId}`);
    console.log(data);
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
                name="present"
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
          <div className="mt-3">
            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RESPONSIBILITIES</FormLabel>
                  <TextEditor
                    onChange={(value) => {
                      field.onChange(value);
                      handleUpdateInputs(field.name, value);
                    }}
                    defaultValue={field.value}
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
