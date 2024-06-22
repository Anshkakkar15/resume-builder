import mongoose from "mongoose";

const SummarySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Idis required"],
  },
  resumeId: {
    type: String,
    required: [true, "Resume Id is required"],
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
  },
});

const SummaryModel =
  mongoose.models.Summary || mongoose.model("Summary", SummarySchema);

export default SummaryModel;
