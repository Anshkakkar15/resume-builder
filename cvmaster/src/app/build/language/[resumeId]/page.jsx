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
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Language() {
  const { resumeId } = useParams();
  const router = useRouter();

  const [input, setInput] = useState([{ input: "" }]);

  const form = useForm();

  return (
    <>
      <BuilderLayout
        heading="Let's Add your prefered lanuages"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque dolorem dignissimos rerum"
        handleBack={() => {
          router?.push(`/build/summary/${resumeId}`);
          backStep("language");
        }}
      >
        <Form {...form}>
          <form>
            <FormLabel>LANGUAGE</FormLabel>
            {input?.length >= 1 &&
              input.map((_, i) => {
                return (
                  <FormField
                    key={i}
                    control={form.control}
                    name={`language_${i + 1}`}
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          {...field}
                          name={`language_${i + 1}`}
                          placeholder="LANGUAGE"
                          className="mt-3"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            <div
              onClick={() => setInput([...input, { input: "" }])}
              className="mt-5 flex cursor-pointer items-center gap-2"
            >
              <Plus /> Add More
            </div>
          </form>
        </Form>
      </BuilderLayout>
    </>
  );
}
