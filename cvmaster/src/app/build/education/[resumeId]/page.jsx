"use client";

import { BuilderLayout } from "@/components/BuilderLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { backStep } from "@/lib/getBuilderPage";
import { useParams, useRouter } from "next/navigation";
import { useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import years, { months } from "../../../../../mock/date";

export default function addEducation() {
  const router = useRouter();
  const { resumeId } = useParams();
  const formRef = useRef();

  const form = useForm({
    defaultValues: {
      instituteName: "",
      degree: "",
      instituteLocation: "",
      graduationMonth: "",
      graduationYear: "",
    },
    // resolver: yupResolver(),
  });

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddEducation),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddEducation = (data) => {
    console.log(data);
    router.push(`/build/education?id=${resumeId}`);
  };

  return (
    <BuilderLayout
      heading="Tell us about your education"
      description="Tell us about any colleges, vocational programs, or training courses you took"
      handleBack={() => {
        router.push(`/build/experience?id=${resumeId}`);
        backStep("education");
      }}
      handleContinue={handleContinue}
    >
      <Form {...form} className="space-y-6">
        <form>
          <FormField
            control={form.control}
            name="instituteName"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>INSTITUTE NAME</FormLabel>
                <Input
                  {...field}
                  name="instituteName"
                  placeholder="INSTITUTE NAME"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>DEGREE</FormLabel>
                <Input {...field} name="degree" placeholder="DEGREE" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instituteLocation"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>INSTITUTE LOCATION</FormLabel>
                <Input
                  {...field}
                  name="instituteLocation"
                  placeholder="INSTITUTE LOCATION"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3">
            <FormLabel>GRADUATION DATE</FormLabel>
            <div className="flex justify-between gap-5">
              <FormField
                control={form.control}
                name="graduationMonth"
                render={({ field }) => (
                  <FormItem className="mt-3 w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-dark-blue shadow-none focus:ring-0 focus:ring-white focus-visible:shadow-none focus-visible:outline-none">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-dark-blue">
                        {months?.map((month, i) => (
                          <SelectItem value={month} key={i}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="graduationYear"
                render={({ field }) => (
                  <FormItem className="mt-3 w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-dark-blue shadow-none focus:ring-0 focus:ring-white focus-visible:shadow-none focus-visible:outline-none">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-dark-blue">
                        {years?.map((year, i) => (
                          <SelectItem value={year.toString()} key={i}>
                            {year.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
