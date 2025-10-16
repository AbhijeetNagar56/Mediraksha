import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  practitioner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Session", sessionSchema);
