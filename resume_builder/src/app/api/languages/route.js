import { resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import LanguageModel from "@/model/Languages";

export async function POST(request) {
  await dbConnect();
  try {
    const { languages, userId, resumeId } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const getLanguages = await LanguageModel.findOne({
      $and: [{ userId, resumeId }],
    });

    const LanguageData = { languages, userId, resumeId };
    if (getLanguages) {
      await LanguageModel.findOneAndUpdate(
        { $and: [{ userId, resumeId }] },
        LanguageData,
        { new: true }
      );
    } else {
      const newLanguageRecord = new LanguageModel(LanguageData);
      await newLanguageRecord.save();
    }

    return Response.json(
      { message: "Details submitted", success: true },
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

    const getLanguages = await LanguageModel.findOne({
      $and: [{ userId, resumeId }],
    });

    return Response.json({ getLanguages, success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching  details", error);
    return Response.json(
      { message: "Error while fetching  details", success: false },
      { status: 500 }
    );
  }
}
