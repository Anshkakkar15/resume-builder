import { resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import ExperienceModule from "@/model/Experience";

export async function POST(request) {
  await dbConnect();
  try {
    const {
      userId,
      resumeId,
      jobTitle,
      employer,
      city,
      country,
      startDate,
      endDate,
      responsibilities,
      isPresent,
    } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const newExperience = new ExperienceModule({
      userId,
      resumeId,
      jobTitle,
      employer,
      city,
      country,
      startDate,
      endDate,
      responsibilities,
      isPresent,
    });

    await newExperience.save();

    return Response.json(
      { message: "Experience Added", success: true },
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
