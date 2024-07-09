import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Idis required"],
  },
  resumeId: {
    type: String,
    required: [true, "Resume Id is required"],
  },
  instituteName: {
    type: String,
    trim: true,
    required: [true, "Institute Name is required"],
  },
  degree: {
    type: String,
    trim: true,
    required: [true, "Degree is required"],
  },
  instituteLocation: {
    type: String,
    trim: true,
    required: [true, "Institute Location is required"],
  },
  graduationMonth: {
    type: String,
    trim: true,
    required: [true, "Graduation Month is required"],
  },
  graduationYear: {
    type: String,
    trim: true,
    required: [true, "Graduation Year is required"],
  },
});

const EducationModule =
  mongoose.models.Education || mongoose.model("Education", educationSchema);

export default EducationModule;
