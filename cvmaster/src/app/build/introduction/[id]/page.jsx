"use client";
import { nextStep } from "@/lib/getBuilderPage";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BuilderLayout } from "@/components/BuilderLayout";

export default function Introduction() {
  const { id } = useParams();
  const router = useRouter();
  const addLanguage = () => {
    router.push(`/build/language/${id}`);
    nextStep("language");
  };

  return (
    <>
      <BuilderLayout
        heading="Let's start with your introduction"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque dolorem dignissimos rerum"
        handleBack={() => {
          router?.push("/");
        }}
        handleContinue={addLanguage}
      >
        dfdsfdfsfd
      </BuilderLayout>
    </>
  );
}
