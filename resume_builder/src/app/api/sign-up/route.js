import dbConnect from "@/lib/db";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return Response.json(
        {
          message: "Email already registered",
          success: false,
        },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
    }

    return Response.json(
      {
        message: "Sign Up Successfull",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while registering user");
    return Response.json(
      { message: "Error while submitting user details", success: false },
      { status: 500 }
    );
  }
}
