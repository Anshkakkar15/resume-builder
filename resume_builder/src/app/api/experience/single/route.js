import { idError, resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import ExperienceModule from "@/model/Experience";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const resumeId = searchParams.get("resumeId");
    const id = searchParams.get("id");

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    if (!id) return idError();

    const getSingleUserExperience = await ExperienceModule.findOne({
      $and: [{ userId, resumeId, _id: id }],
    });

    return Response.json(
      { getSingleUserExperience, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while fetching user experience", error);
    return Response.json(
      { message: "Error while fetching user experience", success: false },
      { status: 500 }
    );
  }
}
