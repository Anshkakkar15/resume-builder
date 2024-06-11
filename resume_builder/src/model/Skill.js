import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Idis required"],
  },
  resumeId: {
    type: String,
    required: [true, "Resume Id is required"],
  },
  skills: {
    type: [String],
    required: [true, "At least one skill is required"],
  },
});

const SkillModel =
  mongoose.models.Skill || mongoose.model("Skill", skillsSchema);

export default SkillModel;
