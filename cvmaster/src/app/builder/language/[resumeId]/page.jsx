"use client";
import { BuilderLayout } from "@/components/BuilderLayout";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { backStep, nextStep } from "@/lib/getBuilderPage";
import { useAddLanguagesMutation } from "@/redux/api";
import { addLanguage, updateLanguage } from "@/redux/slices/LanguageSlice";
import { languageAndSkillSchema } from "@/schemas/languageAndSkillSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useImperativeHandle, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export default function Language({ params }) {
  const router = useRouter();
  const formRef = useRef();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const languageInput = useSelector((state) => state.LanguageSlice.language);
  const userId = useSelector((state) => state.AuthSlice.userId);

  const [addLanguages, { isLoading, isError }] = useAddLanguagesMutation();

  const form = useForm({
    defaultValues: {
      languages: languageInput,
    },
    resolver: yupResolver(languageAndSkillSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  useEffect(() => {
    languageInput.map((elm) => {
      fields?.length < languageInput.length &&
        append({ language: elm?.language });
    });
  }, [languageInput, form]);

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddLanguage),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddLanguage = async (data) => {
    const arr = data.languages.map((lang) => lang.language);

    const response = await addLanguages({
      userId,
      languages: arr,
      resumeId: params?.resumeId,
    });

    if (response?.data?.message) {
      router.push(`/builder/experience/${params?.resumeId}`);
      nextStep("experience");
      toast({
        title: response?.data?.message,
      });
    } else if (isError) {
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
      heading="Let's add your preferred languages"
      description="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque dolorem dignissimos rerum"
      handleBack={() => {
        router?.push(`/builder/summary/${params?.resumeId}`);
        backStep("language");
      }}
      resumeId={params?.resumeId}
      handleContinue={handleContinue}
      isLoading={isLoading}
    >
      <Form {...form}>
        <form>
          <FormLabel>LANGUAGE</FormLabel>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`languages.${index}.language`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <Input
                      {...field}
                      placeholder="LANGUAGE"
                      className="mt-3"
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(
                          updateLanguage({ index, value: e.target.value }),
                        );
                      }}
                    />
                    <div
                      className="mt-3 cursor-pointer rounded-md bg-dark-blue p-2 text-white"
                      onClick={() => remove(index)}
                    >
                      <X />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div
            onClick={() => {
              append({ language: "" });
              dispatch(addLanguage());
            }}
            className="mt-5 flex cursor-pointer items-center gap-2"
          >
            <Plus /> Add More
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
