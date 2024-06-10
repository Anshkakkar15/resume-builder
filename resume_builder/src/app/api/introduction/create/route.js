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

    if (getUserIntro) {
      const updateData = {
        userId,
        resumeId,
        firstName: formData.get("firstName"),
        surname: formData.get("surname"),
        dateOfBirth: formData.get("dateOfBirth"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        country: formData.get("country"),
        pinCode: formData.get("pinCode"),
      };

      const file = formData.get("image");
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const randomSuffix = Date.now() + "-" + Math.floor(Math.random() * 1e6);
        const filename = randomSuffix + "_" + file.name.replaceAll(" ", "_");

        const publicDir = path.join(process.cwd(), "public");
        const assetsDir = path.join(publicDir, "assets");
        const filePath = path.join(assetsDir, filename);
        const relativeFilePath = `/assets/${filename}`;
        await fs.mkdir(assetsDir, { recursive: true });
        await fs.writeFile(filePath, buffer);

        updateData.image = relativeFilePath;
      }

      await IntroductionModel.findOneAndUpdate(
        {
          $and: [{ userId, resumeId }],
        },
        updateData,
        {
          new: true,
        }
      );
    } else {
      const firstName = formData.get("firstName");
      const surname = formData.get("surname");
      const dateOfBirth = formData.get("dateOfBirth");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const country = formData.get("country");
      const pinCode = formData.get("pinCode");
      const file = formData.get("image");

      if (!file) {
        return Response.json(
          { message: "No files received.", success: false },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const randomSuffix = Date.now() + "-" + Math.floor(Math.random() * 1e6);
      const filename = randomSuffix + "_" + file.name.replaceAll(" ", "_");

      const publicDir = path.join(process.cwd(), "public");
      const assetsDir = path.join(publicDir, "assets");
      const filePath = path.join(assetsDir, filename);
      const relativeFilePath = `/assets/${filename}`;

      // Ensure the directory exists
      await fs.mkdir(assetsDir, { recursive: true });

      // Write the file
      await fs.writeFile(filePath, buffer);

      const saveIntroduction = new IntroductionModel({
        userId: userId,
        resumeId: resumeId,
        firstName,
        surname,
        dateOfBirth,
        email,
        phone,
        country,
        pinCode,
        image: relativeFilePath,
      });

      await saveIntroduction.save();
    }

    return Response.json(
      { message: "Details submitted", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while submitting details", error);
    return Response.json({ success: false }, { status: 500 });
  }
}
