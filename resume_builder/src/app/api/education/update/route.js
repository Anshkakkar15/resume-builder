import { idError, resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import EducationModule from "@/model/Education";

export async function POST(request) {
  await dbConnect();
  try {
    const {
      id,
      userId,
      resumeId,
      instituteName,
      degree,
      instituteLocation,
      graduationMonth,
      graduationYear,
    } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    if (!id) return idError();

    const updateEducation = await EducationModule.findOneAndUpdate(
      { $and: [{ userId, resumeId, _id: id }] },
      {
        userId,
        resumeId,
        instituteName,
        degree,
        instituteLocation,
        graduationMonth,
        graduationYear,
      },
      {
        new: true,
      }
    );

    if (!updateEducation) {
      return Response.json(
        { message: "Unable to find resume with given details", success: false },
        { status: 400 }
      );
    }

    return Response.json(
      {
        updateEducation,
        message: "Details updated successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while updating details", error);
    return Response.json(
      { message: "Error while updating details", success: false },
      { status: 500 }
    );
  }
}
