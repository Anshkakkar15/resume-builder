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
import { useDispatch, useSelector } from "react-redux";
import { updateIntroduction } from "@/redux/slices/IntroductionSlice";
import { Label } from "@/components/ui/label";

export default function Introduction() {
  const { resumeId } = useParams();
  const formRef = useRef();
  const router = useRouter();
  const introductionInputs = useSelector((state) => state.IntroductionSlice);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: introductionInputs,
    resolver: yupResolver(introudctionSchema),
  });

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddIntroduction),
  }));

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleInputChange = (field) => (e) => {
    const value = field === "image" ? e.target.files[0] : e.target.value;
    dispatch(updateIntroduction({ [field]: value }));
    field === "image" &&
      dispatch(
        updateIntroduction({
          imageUrl: URL.createObjectURL(e.target.files[0]),
        }),
      );
    form.setValue(field, value);
  };

  const handleAddIntroduction = (data) => {
    console.log(introductionInputs);
    router.push(`/build/summary/${resumeId}`);
    nextStep("summary");
  };

  return (
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
                <Input
                  {...field}
                  name="firstName"
                  placeholder="FIRST NAME"
                  onChangeCapture={handleInputChange(field.name)}
                />
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
                <Input
                  {...field}
                  name="lastName"
                  placeholder="LAST NAME"
                  onChangeCapture={handleInputChange(field.name)}
                />
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
                <Input
                  {...field}
                  name="jobTitle"
                  placeholder="JOB TITLE"
                  onChangeCapture={handleInputChange(field.name)}
                />
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
                <Input
                  {...field}
                  name="email"
                  placeholder="EMAIL"
                  onChangeCapture={handleInputChange(field.name)}
                />
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
                  onChangeCapture={handleInputChange(field.name)}
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
                <Input
                  {...field}
                  name="address"
                  placeholder="ADDRESS"
                  onChangeCapture={handleInputChange(field.name)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3">
            <Label htmlFor="picture">IMAGE</Label>
            <Input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              className="mt-4"
              onChangeCapture={handleInputChange("image")}
            />
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
