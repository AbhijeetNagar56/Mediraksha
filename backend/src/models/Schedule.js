import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to user
  },
  { timestamps: true }
);

export default mongoose.model("Schedule", scheduleSchema);
