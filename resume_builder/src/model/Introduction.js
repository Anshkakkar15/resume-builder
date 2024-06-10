import mongoose from "mongoose";

const IntroductionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Idis required"],
  },
  resumeId: {
    type: String,
    required: [true, "Resume Id is required"],
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, "First Name is required"],
  },
  surname: {
    type: String,
    trim: true,
    required: [true, "Surname is required"],
  },
  dateOfBirth: {
    type: String,
    trim: true,
    required: [true, "Date of birth is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Phone no is required"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
  },
  pinCode: {
    type: String,
    trim: true,
    required: [true, "Pin Code is required"],
  },
  image: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Image is required"],
  },
});

const IntroductionModel =
  mongoose.models.Introduction ||
  mongoose.model("Introduction", IntroductionSchema);

export default IntroductionModel;
