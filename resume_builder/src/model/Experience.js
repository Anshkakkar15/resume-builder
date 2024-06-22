import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Idis required"],
  },
  resumeId: {
    type: String,
    required: [true, "Resume Id is required"],
  },
  jobTitle: {
    type: String,
    trim: true,
    required: [true, "Job Title is required"],
  },
  employer: {
    type: String,
    trim: true,
    required: [true, "Employer is required"],
  },
  city: {
    type: String,
    trim: true,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
  },
  startDate: {
    type: String,
    trim: true,
    required: [true, "Start Date is required"],
  },
  endDate: {
    type: String,
    trim: true,
    required: [true, "End Date is required"],
  },
  responsibilities: {
    type: String,
    trim: true,
    required: [true, "Responsibilities is required"],
  },
});

const ExperienceModule =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default ExperienceModule;
