"use client";
import { nextStep } from "@/lib/getBuilderPage";
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
import { useEffect, useImperativeHandle, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { introudctionSchema } from "@/schemas/introductionSchema";
import { useDispatch, useSelector } from "react-redux";
import { updateIntroduction } from "@/redux/slices/IntroductionSlice";
import { useAddIntroductionMutation } from "@/redux/api";
import { useToast } from "@/components/ui/use-toast";

export default function Introduction({ params }) {
  const formRef = useRef();
  const router = useRouter();
  const { toast } = useToast();
  const introductionInputs = useSelector((state) => state.IntroductionSlice);

  const userId = useSelector((state) => state.AuthSlice.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const defaultValues = {};
    defaultValues.firstName = introductionInputs?.firstName;
    defaultValues.lastName = introductionInputs?.lastName;
    defaultValues.jobTitle = introductionInputs?.jobTitle;
    defaultValues.email = introductionInputs?.email;
    defaultValues.phone = introductionInputs?.phone;
    defaultValues.address = introductionInputs?.address;
    form.reset(defaultValues);
  }, [introductionInputs]);

  const [addIntroduction, { isLoading, isError }] =
    useAddIntroductionMutation();

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
          imageUrl:
            e.target.files[0] && URL?.createObjectURL(e.target.files[0]),
        }),
      );
    form.setValue(field, value);
  };

  const handleAddIntroduction = async () => {
    const formData = new FormData();
    console.log(introductionInputs);
    formData.append("userId", userId);
    formData.append("resumeId", params?.resumeId);
    formData.append("firstName", introductionInputs.firstName);
    formData.append("lastName", introductionInputs.lastName);
    formData.append("jobTitle", introductionInputs.jobTitle);
    formData.append("email", introductionInputs.email);
    formData.append("phone", introductionInputs.phone);
    formData.append("address", introductionInputs.address);
    formData.append("image", introductionInputs.image);
    const response = await addIntroduction(formData);
    if (response?.data?.message) {
      router.push(`/builder/summary/${params?.resumeId}`);
      nextStep("summary");
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
      heading="Let's start with your introduction"
      description="Begin by including your full name and ways for employers to contact you"
      handleBack={() => {
        router?.push("/");
      }}
      resumeId={params?.resumeId}
      handleContinue={handleContinue}
      isLoading={isLoading}
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
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>IMAGE</FormLabel>
                  <Input
                    {...field}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChangeCapture={handleInputChange("image")}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
