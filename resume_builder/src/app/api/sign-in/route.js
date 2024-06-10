import dbConnect from "@/lib/db";
import UserModel from "@/model/User";

import bcrypt from "bcryptjs";

export async function POST(request) {
  dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return Response.json(
        { message: "No user found with this email", success: false },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      return Response.json({ data: user, success: true }, { status: 200 });
    } else {
      return Response.json(
        { message: "Incorrect Password", success: false },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "Error while login! please try again later", success: false },
      { status: 500 }
    );
  }
}
