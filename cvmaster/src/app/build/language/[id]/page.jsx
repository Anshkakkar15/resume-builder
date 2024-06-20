"use client";
import { BuilderLayout } from "@/components/BuilderLayout";
import { backStep } from "@/lib/getBuilderPage";
import { useParams, useRouter } from "next/navigation";

export default function Language() {
  const { id } = useParams();
  const router = useRouter();
  return (
    <>
      <BuilderLayout
        heading="Let's Add your prefered lanuages"
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque dolorem dignissimos rerum"
        handleBack={() => {
          router?.push(`/build/introduction/${id}`);
          backStep("language");
        }}
      >
        dfdsfdfsfd
      </BuilderLayout>
    </>
  );
}
