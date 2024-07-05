"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import { useRouter } from "next/navigation";
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
import { useAddSummaryMutation } from "@/redux/api";
import { useToast } from "@/components/ui/use-toast";

export default function Summary({ params }) {
  const formRef = useRef();
  const router = useRouter();
  const { toast } = useToast();

  const [addSummary, { isLoading, isError }] = useAddSummaryMutation();

  const summaryInputs = useSelector((state) => state.SummarySlice);
  const userId = useSelector((state) => state.AuthSlice.userId);

  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: summaryInputs,
    resolver: yupResolver(summarySchema),
  });
  useEffect(() => {
    const defaultValues = {};
    defaultValues.summary = summaryInputs.summary;
    form.reset(defaultValues);
  }, [summaryInputs]);

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddSummary),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddSummary = async () => {
    const response = await addSummary({
      userId,
      resumeId: params?.resumeId,
      summary: summaryInputs.summary,
    });

    if (response?.data?.message) {
      router.push(`/builder/language/${params?.resumeId}`);
      nextStep("language");
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
      heading="Now add a brief summary showcasing your abilities."
      handleContinue={handleContinue}
      handleBack={() => {
        router.push(`/builder/introduction/${params?.resumeId}`);
        backStep("summary");
      }}
      resumeId={params?.resumeId}
      isLoading={isLoading}
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
