import { resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import IntroductionModel from "@/model/Introduction";

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const resumeId = searchParams.get("resumeId");

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const getUserIntro = await IntroductionModel.findOne({
      $and: [{ userId, resumeId }],
    });

    return Response.json({ getUserIntro, success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching user details", error);
    return Response.json(
      { message: "Error while fetching user details", success: false },
      { status: 500 }
    );
  }
}
