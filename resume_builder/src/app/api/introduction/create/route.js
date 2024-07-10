import dbConnect from "@/lib/db";
import { resumeIdError, sessionError } from "@/lib/Errors";
import path from "path";
import { promises as fs } from "fs";
import IntroductionModel from "@/model/Introduction";

export async function POST(request) {
  await dbConnect();
  try {
    const formData = await request.formData();

    const userId = formData.get("userId");
    const resumeId = formData.get("resumeId");

    if (!userId) return sessionError();

    if (!resumeId) return resumeIdError();

    const getUserIntro = await IntroductionModel.findOne({
      $and: [{ userId, resumeId }],
    });

    const updateData = {
      userId,
      resumeId,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      jobTitle: formData.get("jobTitle"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      image: formData.get("image"),
    };

    // const file = formData.get("image");
    // if (file && file.size > 0) {
    //   const buffer = Buffer.from(await file.arrayBuffer());
    //   const randomSuffix = Date.now() + "-" + Math.floor(Math.random() * 1e6);
    //   const filename = randomSuffix + "_" + file.name.replaceAll(" ", "_");

    //   const publicDir = path.join(process.cwd(), "public");
    //   const assetsDir = path.join(publicDir, "assets");
    //   const filePath = path.join(assetsDir, filename);
    //   const relativeFilePath = `/assets/${filename}`;

    //   try {
    //     await fs.mkdir(assetsDir, { recursive: true });
    //     await fs.writeFile(filePath, buffer);
    //   } catch (err) {
    //     console.error("Error creating directory or writing file", err);
    //     return Response.json(
    //       { success: false, error: "File upload failed" },
    //       { status: 500 }
    //     );
    //   }

    //   updateData.image = relativeFilePath;
    // }

    if (getUserIntro) {
      await IntroductionModel.findOneAndUpdate(
        { $and: [{ userId, resumeId }] },
        updateData,
        { new: true }
      );
    } else {
      const saveIntroduction = new IntroductionModel(updateData);

      await saveIntroduction.save();
    }

    return Response.json(
      { message: "Details submitted", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while submitting details", error);
    return Response.json(
      { message: "Error while submitting details", success: false },
      { status: 500 }
    );
  }
}
