import { idError, resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import ExperienceModule from "@/model/Experience";

export async function POST(request) {
  await dbConnect();
  try {
    const {
      id,
      userId,
      resumeId,
      jobTitle,
      employer,
      city,
      country,
      startDate,
      endDate,
      responsibilities,
    } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    if (!id) return idError();

    const updateExperience = await ExperienceModule.findOneAndUpdate(
      { $and: [{ userId, resumeId, _id: id }] },
      {
        userId,
        resumeId,
        jobTitle,
        employer,
        city,
        country,
        startDate,
        endDate,
        responsibilities,
      },
      {
        new: true,
      }
    );

    if (!updateExperience) {
      return Response.json(
        { message: "Unable to find resume with given details", success: false },
        { status: 400 }
      );
    }

    return Response.json(
      {
        updateExperience,
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
