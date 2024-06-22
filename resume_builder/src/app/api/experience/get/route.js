import { resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import ExperienceModule from "@/model/Experience";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const resumeId = searchParams.get("resumeId");

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const getUserExperience = await ExperienceModule.find({
      $and: [{ userId, resumeId }],
    });

    return Response.json({ getUserExperience, success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching user experience", error);
    return Response.json(
      { message: "Error while fetching user experience", success: false },
      { status: 500 }
    );
  }
}
