import { resumeIdError, sessionError } from "@/lib/Errors";
import dbConnect from "@/lib/db";
import SummaryModel from "@/model/Summary";

export async function POST(request) {
  await dbConnect();
  try {
    const { summary, userId, resumeId } = await request.json();

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const getSummary = await SummaryModel.findOne({
      $and: [{ userId, resumeId }],
    });

    const SummaryData = { summary, userId, resumeId };
    if (getSummary) {
      await SummaryModel.findOneAndUpdate(
        { $and: [{ userId, resumeId }] },
        SummaryData,
        { new: true }
      );
    } else {
      const newSummary = new SummaryModel(SummaryData);
      await newSummary.save();
    }

    return Response.json(
      { message: "Details saved successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while updating summary", error);
    return Response.json(
      { message: "Error while updating summary", success: false },
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

    const getSummary = await SummaryModel.findOne({
      $and: [{ userId, resumeId }],
    });

    return Response.json({ getSummary, success: true }, { status: 200 });
  } catch (error) {
    console.log("Error while fetching details", error);
    return Response.json(
      { message: "Error while fetching details", success: false },
      { status: 500 }
    );
  }
}
