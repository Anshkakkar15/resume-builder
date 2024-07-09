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
import { backStep } from "@/lib/getBuilderPage";
import { useAddSkillsMutation, useGetSkillsQuery } from "@/redux/api";
import {
  addSkills,
  removeSkills,
  updateSkills,
} from "@/redux/slices/SkillsSlice";
import { languageAndSkillSchema } from "@/schemas/languageAndSkillSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useImperativeHandle, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
export default function Skills() {
  const router = useRouter();
  const { toast } = useToast();
  const { resumeId } = useParams();
  const formRef = useRef();
  const dispatch = useDispatch();
  const skillInput = useSelector((state) => state.SkillsSlice.skills);
  const userId = useSelector((state) => state.AuthSlice.userId);
  const [addSkillsList, { isLoading, isError }] = useAddSkillsMutation();

  const form = useForm({
    defaultValues: {
      languages: skillInput,
    },
    resolver: yupResolver(languageAndSkillSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const getAllSkills = useGetSkillsQuery(
    `userId=${userId}&resumeId=${resumeId}`,
    {
      skip: !userId,
    },
  );

  useEffect(() => {
    const languages = getAllSkills?.data?.getSkills?.skills?.map((skill) => ({
      language: skill,
    }));

    form.reset({ languages });
  }, [getAllSkills?.isSuccess]);

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddSkills),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };
  const handleAddSkills = async (data) => {
    const arr = data.languages.map((lang) => lang.language);
    const response = await addSkillsList({
      userId,
      resumeId,
      skills: arr,
    });
    if (response?.data?.message) {
      router.push(`/builder/download/${resumeId}`);
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
      heading={"We suggest including a few skills."}
      description="Choose skills that align with the job requirements to demonstrate your suitability for the role."
      handleBack={() => {
        router.push(`/builder/education?id=${resumeId}`);
        backStep("skills");
      }}
      handleContinue={handleContinue}
      isLoading={isLoading}
      resumeId={resumeId}
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
                    <Input
                      {...field}
                      placeholder="SKILLS"
                      className="mt-3"
                      onChange={(e) => {
                        field.onChange(e);
                        dispatch(
                          updateSkills({ index, value: e.target.value }),
                        );
                      }}
                    />
                    <div
                      className="mt-3 cursor-pointer rounded-md bg-dark-blue p-2 text-white"
                      onClick={() => {
                        remove(index);
                        dispatch(removeSkills(index));
                      }}
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
              dispatch(addSkills());
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
