"use client";

import { useImperativeHandle, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { BuilderLayout } from "@/components/BuilderLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { summarySchema } from "@/schemas/skillsSchema";
import { backStep, nextStep } from "@/lib/getBuilderPage";

export default function Summary() {
  const { resumeId } = useParams();
  const formRef = useRef();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      summary: "",
    },
    resolver: yupResolver(summarySchema),
  });

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddSummary),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddSummary = (data) => {
    console.log(data);
    router.push(`/build/language/${resumeId}`);
    nextStep("language");
  };

  return (
    <BuilderLayout
      heading="Now add a brief summary showcasing your abilities."
      handleContinue={handleContinue}
      handleBack={() => {
        router.push(`/build/introduction/${resumeId}`);
        backStep("summary");
      }}
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SUMMARY</FormLabel>
                <Textarea {...field} name="summary" rows="10" />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </BuilderLayout>
  );
}
