import { resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import EducationModule from "@/model/Education";

export async function POST(request) {
  await dbConnect();
  try {
    const {
      userId,
      resumeId,
      instituteName,
      degree,
      specialization,
      instituteLocation,
      graduationMonth,
      graduationYear,
    } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const newEducation = new EducationModule({
      userId,
      resumeId,
      instituteName,
      degree,
      specialization,
      instituteLocation,
      graduationMonth,
      graduationYear,
    });

    await newEducation.save();

    return Response.json(
      { message: "Details saved successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while adding details", error);
    return Response.json(
      { message: "Error while adding details", success: false },
      { status: 500 }
    );
  }
}
