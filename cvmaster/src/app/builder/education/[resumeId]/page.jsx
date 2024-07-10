"use client";

import { BuilderLayout } from "@/components/BuilderLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { backStep } from "@/lib/getBuilderPage";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import years, { months } from "../../../../../mock/date";
import { educationSchema } from "@/schemas/educationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { educationState, updateEducation } from "@/redux/slices/EducationSlice";
import {
  useAddEducationDetailsMutation,
  useGetSingleEducationQuery,
  useUpdateEducationDetailsMutation,
} from "@/redux/api";
import { useToast } from "@/components/ui/use-toast";

export default function AddEducation() {
  const router = useRouter();
  const { resumeId } = useParams();
  const searchParams = useSearchParams();
  const formRef = useRef();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const eduId = searchParams.get("edu");
  const eduIndx = searchParams.get("eduInd");
  const userId = useSelector((state) => state.AuthSlice.userId);
  const educationInputs = useSelector((state) => state.EducationSlice);
  const education = useAddEducationDetailsMutation();
  const editEducation = useUpdateEducationDetailsMutation();

  const form = useForm({
    defaultValues: educationState,
    resolver: yupResolver(educationSchema),
  });

  useImperativeHandle(formRef, () => ({
    submit: form.handleSubmit(handleAddEducation),
  }));

  const handleUpdateInputs = (field, value) => {
    dispatch(
      updateEducation({
        index: eduIndx ? eduIndx : educationInputs.index,
        value: { [field]: value },
      }),
    );
  };

  const getSingleEducation = useGetSingleEducationQuery(
    `id=${eduId}&userId=${userId}&resumeId=${resumeId}`,
    {
      skip: !userId,
      refetchOnMountOrArgChange: true,
    },
  );
  useEffect(() => {
    if (getSingleEducation?.data?.getSingleEducationDetails) {
      const defaultValues = {};
      defaultValues.instituteName =
        getSingleEducation?.data?.getSingleEducationDetails.instituteName;
      defaultValues.degree =
        getSingleEducation?.data?.getSingleEducationDetails.degree;
      defaultValues.instituteLocation =
        getSingleEducation?.data?.getSingleEducationDetails.instituteLocation;
      defaultValues.graduationMonth =
        getSingleEducation?.data?.getSingleEducationDetails.graduationMonth;
      defaultValues.graduationYear =
        getSingleEducation?.data?.getSingleEducationDetails.graduationYear;
      form.reset(defaultValues);
    }
  }, [getSingleEducation?.data?.getSingleEducationDetails]);

  const handleContinue = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handleAddEducation = async (data) => {
    const educationObj = {
      userId: userId,
      resumeId: resumeId,
      instituteName: data.instituteName,
      degree: data.degree,
      instituteLocation: data.instituteLocation,
      graduationMonth: data.graduationMonth,
      graduationYear: data.graduationYear,
    };
    if (eduIndx) {
      educationObj["id"] = eduId;
      const response = await editEducation[0](educationObj);
      if (response?.data?.success) {
        toast({
          title: response?.data?.message,
        });
        router.push(`/builder/education?id=${resumeId}`);
      }
      if (editEducation[1].isError) {
        toast({
          variant: "destructive",
          title: response?.error?.data?.message
            ? response?.error?.data?.message
            : "Error while submitting details",
        });
      }
    } else {
      const response = await education[0](educationObj);
      if (response?.data?.success) {
        toast({
          title: response?.data?.message,
        });
        router.push(`/builder/education?id=${resumeId}`);
      }
      if (education[1].isError) {
        toast({
          variant: "destructive",
          title: response?.error?.data?.message
            ? response?.error?.data?.message
            : "Error while submitting details",
        });
      }
    }
  };
  return (
    <BuilderLayout
      heading="Tell us about your education"
      description="Tell us about any colleges, vocational programs, or training courses you took"
      handleBack={() => {
        router.push(`/builder/experience?id=${resumeId}`);
        backStep("education");
      }}
      handleContinue={handleContinue}
      resumeId={resumeId}
      skipButton={educationInputs?.educationFields?.length >= 1}
      handleSkip={() => router.push(`/builder/education?id=${resumeId}`)}
      isLoading={education[1].isLoading || editEducation[1].isLoading}
    >
      <Form {...form} className="space-y-6">
        <form>
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>DEGREE</FormLabel>
                <Input
                  {...field}
                  placeholder="DEGREE"
                  onChange={(e) => {
                    field.onChange(e);
                    handleUpdateInputs(field.name, e.target.value);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instituteName"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>INSTITUTE NAME</FormLabel>
                <Input
                  {...field}
                  placeholder="INSTITUTE NAME"
                  onChange={(e) => {
                    field.onChange(e);
                    handleUpdateInputs(field.name, e.target.value);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instituteLocation"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>INSTITUTE LOCATION</FormLabel>
                <Input
                  {...field}
                  placeholder="INSTITUTE LOCATION"
                  onChange={(e) => {
                    field.onChange(e);
                    handleUpdateInputs(field.name, e.target.value);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3">
            <FormLabel>GRADUATION DATE</FormLabel>
            <div className="flex justify-between gap-5">
              <FormField
                control={form.control}
                name="graduationMonth"
                render={({ field }) => (
                  <FormItem className="mt-3 w-full">
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        handleUpdateInputs(field.name, e);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-dark-blue shadow-none focus:ring-0 focus:ring-white focus-visible:shadow-none focus-visible:outline-none">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-dark-blue">
                        {months?.map((month, i) => (
                          <SelectItem value={month} key={i}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="graduationYear"
                render={({ field }) => (
                  <FormItem className="mt-3 w-full">
                    <Select
                      defaultValue={field.value}
                      onValueChange={(e) => {
                        field.onChange(e);
                        handleUpdateInputs(field.name, e);
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="border-dark-blue shadow-none focus:ring-0 focus:ring-white focus-visible:shadow-none focus-visible:outline-none">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="border-dark-blue">
                        {years?.map((year, i) => (
                          <SelectItem value={year.toString()} key={i}>
                            {year.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
