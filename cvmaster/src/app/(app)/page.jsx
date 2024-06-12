import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ASSETS } from "../../../assets";

export default function Home() {
  return (
    <div className="bg-light-blue">
      <div className="container mx-auto py-14 px-0">
        <div className="grid grid-cols-2 items-center">
          <div className="flex flex-col gap-y-6">
            <h1 className="font-semibold font-popins text-dark-blue text-6xl leading-[65px]">
              Craft Your Perfect Resume in Minutes!
            </h1>
            <p className="text-dark-blue font-popins text-2xl leading-9 font-medium">
              Create a professional resume effortlessly with our innovative
              builder. Customize templates, highlight your achievements, and
              land your dream job
            </p>
            <Button
              variant="outline"
              size="lg"
              className="max-w-max text-lg px-10 py-3 mt-14"
            >
              Craft Your Resume
            </Button>
          </div>
          <div className="flex justify-end">
            <Image src={ASSETS.HERO_RESUME} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
