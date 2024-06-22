"use client";
import { nextStep } from "@/lib/getBuilderPage";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BuilderLayout } from "@/components/BuilderLayout";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useImperativeHandle, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { introudctionSchema } from "@/schemas/introductionSchema";

export default function Introduction() {
  const { resumeId } = useParams();
  const formRef = useRef();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
    },
    resolver: yupResolver(introudctionSchema),
  });

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(addLanguage),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const addLanguage = (data) => {
    console.log(data);
    router.push(`/build/download/${resumeId}`);
    // nextStep("language");
  };

  return (
    <>
      <BuilderLayout
        heading="Let's start with your introduction"
        description="Begin by including your full name and ways for employers to contact you"
        handleBack={() => {
          router?.push("/");
        }}
        handleContinue={handleContinue}
      >
        <Form {...form} className="space-y-6">
          <form>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>FIRST NAME</FormLabel>
                  <Input {...field} name="firstName" placeholder="FIRST NAME" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>LAST NAME</FormLabel>
                  <Input {...field} name="lastName" placeholder="LAST NAME" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>JOB TITLE</FormLabel>
                  <Input {...field} name="jobTitle" placeholder="JOB TITLE" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>EMAIL</FormLabel>
                  <Input {...field} name="email" placeholder="EMAIL" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>PHONE</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    name="phone"
                    placeholder="PHONE"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>ADDRESS</FormLabel>
                  <Input {...field} name="address" placeholder="ADDRESS" />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </BuilderLayout>
    </>
  );
}
