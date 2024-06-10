import { idError, resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import ExperienceModule from "@/model/Experience";

export async function POST(request) {
  await dbConnect();

  try {
    const { id, userId, resumeId } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    if (!id) return idError();

    const deleteExperienceDetails = await ExperienceModule.findOneAndDelete({
      $and: [{ userId, resumeId, _id: id }],
    });

    if (!deleteExperienceDetails) {
      return Response.json(
        { message: "Unable to find details or deleted before", success: false },
        { status: 400 }
      );
    }

    return Response.json(
      {
        message: "Details deleted successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while deleting details", error);
    return Response.json(
      { message: "Error while deleting details", success: false },
      { status: 500 }
    );
  }
}
