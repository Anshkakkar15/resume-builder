import { resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import SkillModel from "@/model/Skill";

export async function POST(request) {
  await dbConnect();
  try {
    const { skills, userId, resumeId } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const getSkills = await SkillModel.findOne({
      $and: [{ userId, resumeId }],
    });

    const SkillData = { skills, userId, resumeId };
    if (getSkills) {
      await SkillModel.findOneAndUpdate(
        { $and: [{ userId, resumeId }] },
        SkillData,
        { new: true }
      );
    } else {
      const newLanguageRecord = new SkillModel(SkillData);
      await newLanguageRecord.save();
    }

    return Response.json(
      { message: "Details saved successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while updating languages", error);
    return Response.json(
      { message: "Error while updating languages", success: false },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const resumeId = searchParams.get("resumeId");

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const getSkills = await SkillModel.findOne({
      $and: [{ userId, resumeId }],
    });

    return Response.json({ getSkills, success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching details", error);
    return Response.json(
      { message: "Error while fetching details", success: false },
      { status: 500 }
    );
  }
}
