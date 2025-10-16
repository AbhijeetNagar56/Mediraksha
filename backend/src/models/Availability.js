import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  day: { type: String, required: true }, // e.g., "Monday"
  startTime: { type: String, required: true }, // "09:00"
  endTime: { type: String, required: true }, // "17:00"
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Availability", availabilitySchema);
