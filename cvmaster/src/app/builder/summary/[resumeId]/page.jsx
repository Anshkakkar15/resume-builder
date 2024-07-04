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
import { useDispatch, useSelector } from "react-redux";
import { updateSummary } from "@/redux/slices/SummarySlice";

export default function Summary() {
  const { resumeId } = useParams();
  const formRef = useRef();
  const router = useRouter();

  const summaryInputs = useSelector((state) => state.SummarySlice);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: summaryInputs,
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
    console.log(summaryInputs);
    router.push(`/builder/language/${resumeId}`);
    nextStep("language");
  };

  return (
    <BuilderLayout
      heading="Now add a brief summary showcasing your abilities."
      handleContinue={handleContinue}
      handleBack={() => {
        router.push(`/builder/introduction/${resumeId}`);
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
                <Textarea
                  {...field}
                  name="summary"
                  rows="10"
                  onChangeCapture={(e) =>
                    dispatch(updateSummary(e.target.value))
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </BuilderLayout>
  );
}
