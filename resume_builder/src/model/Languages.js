import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Idis required"],
  },
  resumeId: {
    type: String,
    required: [true, "Resume Id is required"],
  },
  languages: {
    type: [String],
    required: [true, "At least one language is required"],
  },
});

const LanguageModel =
  mongoose.models.Languages || mongoose.model("Languages", languageSchema);

export default LanguageModel;
