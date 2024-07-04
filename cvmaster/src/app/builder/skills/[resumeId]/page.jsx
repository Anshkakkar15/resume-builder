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
import { backStep } from "@/lib/getBuilderPage";
import { languageAndSkillSchema } from "@/schemas/languageAndSkillSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useImperativeHandle, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
export default function Skills() {
  const router = useRouter();
  const { resumeId } = useParams();
  const formRef = useRef();
  const form = useForm({
    defaultValues: {
      languages: [{ language: "" }],
    },
    resolver: yupResolver(languageAndSkillSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddSkills),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  const handleAddSkills = (data) => {
    console.log(data);
    router.push(`/builder/download/${resumeId}`);
  };

  return (
    <BuilderLayout
      heading={"We suggest including a few skills."}
      description="Choose skills that align with the job requirements to demonstrate your suitability for the role."
      handleBack={() => {
        router.push(`/builder/education?id=${resumeId}`);
        backStep("skills");
      }}
      handleContinue={handleContinue}
    >
      <Form {...form}>
        <form>
          <FormLabel>SKILLS</FormLabel>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`languages.${index}.language`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <Input {...field} placeholder="SKILLS" className="mt-3" />
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
            onClick={() => append({ language: "" })}
            className="mt-5 flex cursor-pointer items-center gap-2"
          >
            <Plus /> Add More
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
