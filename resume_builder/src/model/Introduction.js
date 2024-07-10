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
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last Name is required"],
  },
  jobTitle: {
    type: String,
    trim: true,
    required: [true, "Job Title is required"],
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
  address: {
    type: String,
    trim: true,
    required: [true, "Address is required"],
  },

  image: {
    type: String,
    // type: mongoose.Schema.Types.Mixed,
  },
});

const IntroductionModel =
  mongoose.models.Introduction ||
  mongoose.model("Introduction", IntroductionSchema);

export default IntroductionModel;
